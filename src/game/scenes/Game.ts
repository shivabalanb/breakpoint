import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tower } from "../entities/Tower";
import { Direction, Vangaurd } from "../entities/Vanguard";
import { AlienManager } from "../entities/AlienManager";
import { ProjectileManager } from "../entities/ProjectileManager";
import { Projectile } from "../entities/Projectiles/Projectile";

export class Game extends Scene {
    private bg: Phaser.GameObjects.Sprite;
    private timeText: Phaser.GameObjects.Text;

    private tower: Tower;
    private vanguard: Vangaurd;
    private alienManager: AlienManager;
    private projectileManager: ProjectileManager;

    private isFiring: boolean = false;
    private gameTimer: number = 0;
    private timerEvent: Phaser.Time.TimerEvent;

    constructor() {
        super("Game");
    }

    create() {
        this.gameTimer = 0;
        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);

        // entities: tower, gun, bullets, alien
        this.tower = new Tower(this, -10, 50);
        this.projectileManager = new ProjectileManager(this);
        this.vanguard = new Vangaurd(this, 60, 250, this.projectileManager);
        this.alienManager = new AlienManager(this);
        this.timeText = this.add.text(10, 10, "00:00", {
            font: "16px Arial",
            color: "#ffffff",
        });

        this.setupCollisions();

        this.setupInputHandlers();

        this.environmentActions();

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
            this.projectileManager.getProjectileGroup(),
            this.alienManager.getAlienGroup(),
            this.handleProjectileEnemyOverlap,
            undefined,
            this
        );
    }

    private handleTowerCollision(tower: any, alien: any) {
        // tower.takeDamage(alien.getDamage());
        alien.destroy();
    }

    private handleProjectileEnemyOverlap(projectile: any, alien: any) {
        projectile.destroy();
        alien.takeDamage(50);
    }

    private setupInputHandlers() {
        this.input.on("pointerdown", () => (this.isFiring = true));
        this.input.on("pointerup", () => (this.isFiring = false));
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            this.vanguard.rotateToPointer(pointer);
        });
        this.input.keyboard?.on("keydown-W", () => {
            this.vanguard.moveVertical(Direction.UP);
        });
        this.input.keyboard?.on("keydown-S", () => {
            this.vanguard.moveVertical(Direction.DOWN);
        });
        this.input.keyboard?.on("keydown-A", () => {
            this.vanguard.changeGun(Direction.LEFT);
        });
        this.input.keyboard?.on("keydown-D", () => {
            this.vanguard.changeGun(Direction.RIGHT);
        });
    }

    private environmentActions() {
        this.anims.create({
            key: "bg",
            frames: this.anims.generateFrameNumbers("bg", {
                start: 0,
                end: 8,
            }),
            frameRate: 10,
        });

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.bg.play("bg");
            },
            loop: true,
        });

        this.timerEvent = this.time.addEvent({
            delay: 1000, // 1 second
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });
    }

    private updateTimer() {
        this.gameTimer++;
        const minutes = Math.floor(this.gameTimer / 60);
        const seconds = this.gameTimer % 60;
        const fps = Math.floor(this.game.loop.actualFps);

        this.timeText.setText(
            `${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")} ${fps}`
        );
    }

    private changeScene() {
        // const gameTime = Math.floor((this.time.now - this.startTime) / 1000);
        // this.registry.set("score", gameTime);
        this.scene.start("GameOver");
    }

    calculateRotatedOffset(offsetX: number, offsetY: number) {
        const baseX = this.vanguard.x;
        const baseY = this.vanguard.y;
        const rotation = this.vanguard.rotation;
        return {
            x:
                baseX +
                (Math.cos(rotation) * offsetX - Math.sin(rotation) * offsetY),
            y:
                baseY +
                (Math.sin(rotation) * offsetX + Math.cos(rotation) * offsetY),
        };
    }

    update(time: number) {
        if (this.isFiring) {
            const position = this.calculateRotatedOffset(100, 10);
            this.vanguard.anim();
            this.projectileManager.shoot(
                position.x,
                position.y,
                this.vanguard.rotation
            );
        } else {
            this.vanguard.anims.stop();
        }

        this.projectileManager.cleanup();
    }
}

