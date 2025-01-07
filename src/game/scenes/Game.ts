import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tower } from "../entities/Tower";
import { Vangaurd } from "../entities/Vanguard";
import { AlienManager } from "../entities/AlienManager";
import { BulletManager } from "../entities/BulletManager";
import { Alien } from "../entities/Aliens/Alien";

export class Game extends Scene {
    private camera: Phaser.Cameras.Scene2D.Camera;
    private tower: Tower;
    private vanguard: Vangaurd;
    private alienManager: AlienManager;
    private bulletManager: BulletManager;
    private isFiring: boolean = false;
    private timeText: Phaser.GameObjects.Text;
    private startTime: number;

    constructor() {
        super("Game");
    }

    create() {
        this.startTime = this.time.now;
        console.log(`Game scene created ${this.startTime}`);

        // camera + background
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        this.add.image(512, 384, "background").setAlpha(0.4);
        this.add.image(0, 550, "ground").setOrigin(0, 0);

        // entities: tower, gun, bullets, enemy
        this.tower = new Tower(this, -10, 220);
        this.vanguard = new Vangaurd(this, 100, 250);
        this.bulletManager = new BulletManager(this);
        this.alienManager = new AlienManager(this);
        this.timeText = this.add.text(10, 10, "", {
            font: "16px Arial",
            color: "#ffffff",
        });

        this.setupCollisions();

        this.setupInputHandlers();

        // this.time.delayedCall(10000, () => {
        //     this.changeScene();
        // });

        EventBus.emit("current-scene-ready", this);
    }

    private setupCollisions() {
        this.physics.add.collider(
            this.tower,
            this.alienManager.getAlienGroup(),
            this.handleTowerCollision,
            undefined,
            this
        );

        this.physics.add.overlap(
            this.bulletManager.getBulletGroup(),
            this.alienManager.getAlienGroup(),
            this.handleBulletEnemyOverlap,
            undefined,
            this
        );
    }

    private setupInputHandlers() {
        this.input.on("pointerdown", () => (this.isFiring = true));
        this.input.on("pointerup", () => (this.isFiring = false));
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            this.vanguard.rotateToPointer(pointer);
        });
    }

    update(time: number, delta: number) {
        this.updateTimeText();

        if (this.isFiring) {
            this.bulletManager.shoot(
                this.vanguard.x,
                this.vanguard.y,
                this.vanguard.rotation,
                time
            );
        }

        this.bulletManager.cleanup();
    }

    private updateTimeText() {
        const elapsedTime = Math.floor((this.time.now - this.startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = Math.floor(elapsedTime % 60);
        this.timeText.setText(
            `${minutes.toString().padStart(2, "0")} mins ${seconds
                .toString()
                .padStart(2, "0")} seconds`
        );

        if (elapsedTime >= 30) { // 5 minutes = 300 seconds
            this.scene.start("GameWin");
        }
    }

    private handleTowerCollision(tower: any, alien: any) {
        tower.takeDamage(50);
        alien.takeDamage(100);
    }

    private handleBulletEnemyOverlap(bullet: any, alien: any) {
        bullet.destroy();
        alien.takeDamage(50);
    }

    changeScene() {
        const gameTime = Math.floor((this.time.now - this.startTime) / 1000);
        this.registry.set("score", gameTime);
        this.scene.start("GameOver");
    }
}

