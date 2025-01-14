import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tower } from "../entities/Tower";
import { AlienManager } from "../entities/AlienManager";
import { ProjectileManager } from "../entities/ProjectileManager";
import { Projectile } from "../entities/Projectiles/Projectile";
import { Rocket } from "../entities/Projectiles/Rocket";
import { Alien } from "../entities/Aliens/Alien";
import { MachineGun } from "../entities/Vanguards/MachineGun";
import { Direction, Vanguard } from "../entities/Vanguards/Vanguard";
import { RocketLauncher } from "../entities/Vanguards/RocketLauncher";
import { Laser } from "../entities/Vanguards/Laser";

export class Game extends Scene {
    private bg: Phaser.GameObjects.Sprite;
    private timeText: Phaser.GameObjects.Text;

    private tower: Tower;
    private vanguard: Vanguard;
    private vanguardIndex: number = 0;
    private machineGun: MachineGun;
    private rocketLauncher: RocketLauncher;
    private laser: Laser;
    private alienManager: AlienManager;
    private projectileManager: ProjectileManager;

    private gameTimer: number;
    private timerEvent: Phaser.Time.TimerEvent;
    private clickFlag: boolean;

    private reloadSound: Phaser.Sound.BaseSound;

    constructor() {
        super("Game");
    }

    create() {
        this.gameTimer = 0;
        this.bg = this.add.sprite(0, 0, "bg").setOrigin(0, 0);

        this.reloadSound = this.scene.scene.sound.add("reloadSound");

        this.scene.scene.sound.play("backgroundSound", {
            loop: true,
            volume: 1,
            seek: 2,
        });

        // entities: tower, gun, bullets, alien
        this.tower = new Tower(this, -10, 50);
        this.projectileManager = new ProjectileManager(this);
        this.machineGun = new MachineGun(
            this,
            60,
            250,
            this.projectileManager.getProjectileGroup()
        );
        this.rocketLauncher = new RocketLauncher(
            this,
            60,
            250,
            this.projectileManager.getProjectileGroup()
        );
        this.laser = new Laser(
            this,
            60,
            250,
            this.projectileManager.getProjectileGroup()
        );
        this.vanguard = this.machineGun;
        this.rocketLauncher.setVisible(false);
        this.laser.setVisible(false);

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
            this.handleProjectileAlienOverlap,
            undefined,
            this
        );
    }

    private handleTowerCollision(tower: any, alien: any) {
        tower.takeDamage(alien.getDamage());
        alien.destroy();
    }

    private handleProjectileAlienOverlap(projectile: any, alien: any) {
        if (projectile instanceof Rocket) {
            // Create explosion and handle area damage for rockets
            const sound = this.sound.add("explosionSound");
            sound.addMarker({
                name: "explosion_short", // name is required for markers
                start: 0, // start time in seconds
                duration: 1, // duration in seconds
                config: {
                    volume: 1,
                    rate: 1,
                    seek: 1,
                },
            });
            sound.play("explosion_short");

            const explosion = this.add.sprite(
                projectile.x,
                projectile.y,
                "explosion"
            );
            explosion.setScale(4);
            explosion.play("explode");
            explosion.on("animationcomplete", () => {
                explosion.destroy();
            });

            // Get nearby enemies within explosion radius
            const nearbyEnemies = this.physics.overlapCirc(
                projectile.x,
                projectile.y,
                100
            );
            nearbyEnemies.forEach(
                (
                    body:
                        | Phaser.Physics.Arcade.Body
                        | Phaser.Physics.Arcade.StaticBody
                ) => {
                    if (body.gameObject && body.gameObject instanceof Alien) {
                        if (!body.gameObject._isInvincible) {
                            body.gameObject.takeDamage(projectile._damage);
                        }
                    }
                }
            );
        } else {
            // Regular projectile damage
            if (!(alien as Alien)._isInvincible) {
                alien.takeDamage(projectile._damage);
            }
        }
        projectile.destroy();
    }

    private createExplosion(x: number, y: number, projectile: Projectile) {
        const explosion = this.add.sprite(x, y, "explosion");

        explosion.setScale(4);
        explosion.play("explode");
        explosion.on("animationcomplete", () => {
            explosion.destroy();
        });

        const nearbyEnemies = this.physics.overlapCirc(x, y, 50);
        nearbyEnemies.forEach(
            (
                body:
                    | Phaser.Physics.Arcade.Body
                    | Phaser.Physics.Arcade.StaticBody
            ) => {
                if (body.gameObject && body.gameObject instanceof Alien) {
                    // Calculate damage based on distance from explosion
                    const distance = Phaser.Math.Distance.Between(
                        x,
                        y,
                        body.x,
                        body.y
                    );
                    const damage = Math.max(0, Math.floor(projectile._damage));
                    body.gameObject.takeDamage(damage);
                }
            }
        );
    }

    private setupInputHandlers() {
        this.input.on("pointerdown", () => {
            this.clickFlag = true;
        });
        this.input.on("pointerup", () => {
            this.vanguard.once("animationcomplete", () => {
                this.vanguard.anims.stop();
            });
            this.clickFlag = false;
        });
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            this.machineGun.rotateToPointer(pointer);
            this.rocketLauncher.rotateToPointer(pointer);
            this.laser.rotateToPointer(pointer);
        });
        this.input.keyboard?.on("keydown-W", () => {
            this.machineGun.moveVertical(Direction.UP);
            this.rocketLauncher.moveVertical(Direction.UP);
            this.laser.moveVertical(Direction.UP);
        });
        this.input.keyboard?.on("keydown-S", () => {
            this.machineGun.moveVertical(Direction.DOWN);
            this.rocketLauncher.moveVertical(Direction.DOWN);
            this.laser.moveVertical(Direction.DOWN);
        });
        this.input.keyboard?.on("keydown-A", () => {
            this.vanguard.anims.stop();
            this.switchVanguard(Direction.LEFT);
            // this.vanguard.changeGun(Direction.LEFT);
        });
        this.input.keyboard?.on("keydown-D", () => {
            this.vanguard.anims.stop();
            this.switchVanguard(Direction.RIGHT);
            // this.vanguard.changeGun(Direction.RIGHT);
        });
    }

    update() {
        if (this.gameTimer == 300) {
            console.log("gameOver");
            this.scene.start("GameOver");
        }
        if (this.clickFlag) {
            const isCooldown =
                this.time.now <
                this.vanguard._fireRate + this.vanguard._lastFired;
            const isReloading = this.vanguard._isReloading;
            if (isReloading || isCooldown) {
                if (
                    (isReloading ||
                        (this.vanguard == this.laser && isCooldown)) &&
                    !this.reloadSound.isPlaying
                ) {
                    this.reloadSound.play({
                        seek: 3,
                        rate: 3,
                    });
                }
                this.vanguard._isFiring = false;
            } else {
                this.vanguard._isFiring = true;
            }
            if (this.vanguard._isFiring) {
                this.vanguard.anim(this.vanguard._name);

                const position = this.calculateRotatedOffset(100, 10);
                this.vanguard.shoot(
                    position.x,
                    position.y,
                    this.vanguard.rotation
                );
            }
        }
        this.projectileManager.cleanup();
    }

    private environmentActions() {
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 6,
            }),
            frameRate: 20,
            repeat: 0,
        });

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
        this.alienManager.updateWaves(this.gameTimer);

        const minutes = Math.floor(this.gameTimer / 60);
        const seconds = this.gameTimer % 60;
        const fps = Math.floor(this.game.loop.actualFps);

        this.timeText.setText(
            `${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")} ${fps}`
        );
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

    switchVanguard(direction: Direction) {
        this.vanguard.setVisible(false);

        if (direction == Direction.LEFT) {
            if (this.vanguardIndex == 0) {
                this.vanguardIndex = 2;
            } else {
                this.vanguardIndex--;
            }
        } else {
            if (this.vanguardIndex == 2) {
                this.vanguardIndex = 0;
            } else {
                this.vanguardIndex++;
            }
        }

        switch (this.vanguardIndex) {
            case VanguardType.MACHINE_GUN:
                this.vanguard = this.machineGun;
                break;
            case VanguardType.ROCKET_LAUNCHER:
                this.vanguard = this.rocketLauncher;
                break;
            case VanguardType.LASER:
                this.vanguard = this.laser;
                break;
            default:
                break;
        }

        const isCooldown =
            this.time.now < this.vanguard._fireRate + this.vanguard._lastFired;
        const isReloading = this.vanguard._isReloading;

        if (
            (isReloading || (this.vanguard == this.laser && isCooldown)) &&
            !this.reloadSound.isPlaying
        ) {
            this.reloadSound.play({
                seek: 3,
                rate: 3,
            });
        }

        this.vanguard.setVisible(true);
    }
}

export enum VanguardType {
    MACHINE_GUN,
    ROCKET_LAUNCHER,
    LASER,
}

export const vanguardMap = new Map<VanguardType, [string]>([
    [VanguardType.MACHINE_GUN, ["vanguard_m"]],
    [VanguardType.ROCKET_LAUNCHER, ["vanguard_r"]],
    [VanguardType.LASER, ["vanguard_l"]],
]);

