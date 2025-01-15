import { GameObjects, Math as PhaserMath, Scene } from "phaser";
import { Alien } from "./Aliens/Alien";
import { Alien0 } from "./Aliens/Alien0";
import { Alien1 } from "./Aliens/Alien1";
import { Alien2 } from "./Aliens/Alien2";
import { Alien3 } from "./Aliens/Alien3";
import { Alien4 } from "./Aliens/Alien4";
import { Alien5 } from "./Aliens/Alien5";

interface AlienSpawnParams<T> {
    alienCount: number;
    AlienClass: new (scene: Scene, x: number, y: number) => T;
    interval1: [start: number, end: number];
    speedUp?: number;
    hardSpeed?: number;
    interval2?: [start: number, end: number];
    delay?: number;
}

export class AlienManager {
    private scene: Phaser.Scene;
    private aliens: Phaser.Physics.Arcade.Group;
    private wave: number = 1;
    private isBossBattle: boolean = false;

    private readonly GAME_DURATION: number = 300;
    private readonly WAVE_DURATION: number = 60; // 1 minute per wave
    private readonly WIDTH: number;
    private readonly HEIGHT: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.aliens = scene.physics.add.group({
            classType: Alien,
            runChildUpdate: true,
        });

        this.WIDTH = this.scene.cameras.main.width;
        this.HEIGHT = this.scene.cameras.main.height;

        this.startWave();
    }

    public updateWaves(currentTime: number) {
        if (currentTime % 60 === 0) {
            this.wave++;
            this.startWave();
        }
    }

    private startWave() {
        // Display wave number
        const waveText = this.scene.add.text(
            400,
            300,
            this.isBossBattle ? "BOSS BATTLE!" : `Wave ${this.wave}`,
            { fontSize: "64px", color: "#ffffff" }
        );
        waveText.setOrigin(0.5);

        this.scene.tweens.add({
            targets: waveText,
            alpha: 0,
            duration: 2000,
            onComplete: () => {
                waveText.destroy();
                this.spawnWaveEnemies();
            },
        });
    }

    private spawnWaveEnemies() {
        switch (this.wave) {
            case 1:
                // First wave - Easy enemies
                this.spawnWave1();
                break;
            case 2:
                // Second wave - Mix of easy and medium enemies
                this.spawnWave2();
                break;
            case 3:
                // Third wave - Medium enemies and introduction of harder types
                this.spawnWave3();
                break;
            case 4:
                // Fourth wave - Hard enemies preparing for boss
                this.spawnWave4();
                break;
            case 5:
                // Fifth wave - Hard enemies preparing for boss
                this.spawnWave5();
                break;
            default:
                break;
        }
    }

    spawnAlienWave<T extends Alien>(config: AlienSpawnParams<T>) {
        const {
            alienCount,
            AlienClass,
            interval1,
            speedUp,
            hardSpeed,
            interval2,
            delay = 1000,
        } = config;

        let spawned = 0;
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                spawned += 1;
                if (
                    (spawned > interval1[0] && spawned < interval1[1]) ||
                    (interval2 &&
                        spawned > interval2[0] &&
                        spawned < interval2[1])
                )
                    return;

                let x = 0,
                    y = 0;
                let config;
                if (AlienClass.name == "Alien0") {
                    x = this.WIDTH;
                    y = PhaserMath.Between(this.HEIGHT - 50, this.HEIGHT - 200);
                } else if (AlienClass.name == "Alien1") {
                    x =
                        PhaserMath.Between(0, 1) == 1
                            ? this.WIDTH + spawned * 10
                            : this.WIDTH - spawned * 10;
                    y = PhaserMath.Between(100, 400);
                } else if (AlienClass.name == "Alien2") {
                    x =
                        PhaserMath.Between(100, this.WIDTH - 100) +
                        spawned * 75;

                    if (x > this.WIDTH) {
                        x = x % this.WIDTH;
                    }

                    y = this.HEIGHT - (100 + Math.floor(spawned / 5) * 60);
                } else if (AlienClass.name == "Alien3") {
                    const centerX = this.WIDTH / 2;
                    const centerY = 250;
                    const radius = 150;
                    const totalAliens = 12;
                    const angleStep = (2 * Math.PI) / totalAliens;

                    const angle = spawned * angleStep;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                } else if (AlienClass.name == "Alien5") {
                    x = 100 * spawned;
                    y = 300 * spawned;
                }

                if (speedUp && hardSpeed && spawned > speedUp) {
                    this.spawnAlien(AlienClass, spawned, x, y, hardSpeed);
                } else {
                    this.spawnAlien(AlienClass, spawned, x, y);
                }
            },
            repeat: alienCount,
        });
    }

    private spawnWave1() {
        console.log("spawn wave 1");

        this.spawnAlienWave({
            alienCount: 50,
            AlienClass: Alien0,
            interval1: [10, 20],
            speedUp: 25,
            hardSpeed: 80,
            interval2: [34, 40],
        });
    }

    private spawnWave2() {
        console.log("spawn wave 2");

        this.spawnAlienWave({
            alienCount: 20,
            AlienClass: Alien0,
            interval1: [5, 10],
        });
        this.spawnAlienWave({
            alienCount: 30,
            AlienClass: Alien1,
            interval1: [20, 25],
        });
    }

    private spawnWave3() {
        console.log("spawn wave 3");
        this.spawnAlienWave({
            alienCount: 20,
            AlienClass: Alien0,
            interval1: [5, 10],
        });
        this.spawnAlienWave({
            alienCount: 30,
            AlienClass: Alien1,
            interval1: [20, 25],
        });

        this.spawnAlienWave({
            alienCount: 5,
            AlienClass: Alien2,
            interval1: [2, 3],
            delay: 5000,
        });
        this.scene.time.delayedCall(30000, () => {
            this.spawnAlienWave({
                alienCount: 5,
                AlienClass: Alien2,
                interval1: [4, 5],
                delay: 5000,
            });
            this.spawnAlienWave({
                alienCount: 30,
                AlienClass: Alien1,
                interval1: [15, 25],
                delay: 2000,
            });
        });
    }

    private spawnWave4() {
        console.log("spawn wave 4");
        this.spawnAlienWave({
            alienCount: 30,
            AlienClass: Alien0,
            interval1: [5, 10],
        });

        this.spawnAlienWave({
            alienCount: 50,
            AlienClass: Alien3,
            interval1: [20, 30],
            delay: 500,
        });
        this.scene.time.delayedCall(30000, () => {
            this.spawnAlienWave({
                alienCount: 5,
                AlienClass: Alien2,
                interval1: [4, 5],
                delay: 5000,
            });
            this.spawnAlienWave({
                alienCount: 5,
                AlienClass: Alien2,
                interval1: [2, 3],
                delay: 5000,
            });
            this.spawnAlienWave({
                alienCount: 20,
                AlienClass: Alien3,
                interval1: [10, 15],
                delay: 1000,
            });
        });
    }

    private spawnWave5() {
        console.log("spawn wave 5");
        this.spawnAlienWave({
            alienCount: 0,
            AlienClass: Alien5,
            interval1: [0, 0],
        });

        this.spawnAlienWave({
            alienCount: 20,
            AlienClass: Alien4,
            interval1: [20, 30],
        });

        this.spawnAlienWave({
            alienCount: 20,
            AlienClass: Alien3,
            interval1: [10, 15],
        });
        this.scene.time.delayedCall(30000, () => {
            this.spawnAlienWave({
                alienCount: 5,
                AlienClass: Alien2,
                interval1: [4, 5],
                delay: 5000,
            });
            this.spawnAlienWave({
                alienCount: 30,
                AlienClass: Alien0,
                interval1: [20, 25],
            });
            this.spawnAlienWave({
                alienCount: 30,
                AlienClass: Alien3,
                interval1: [10, 20],
                delay: 500,
            });
        });
    }

    private spawnAlien<T extends Alien>(
        AlienClass: new (scene: Scene, x: number, y: number) => T,
        spawned: number,
        x: number,
        y: number,
        speed?: number
    ) {
        let alien;

        alien = new AlienClass(this.scene, x, y);
        if (speed) {
            alien.setSpeed(speed);
        }
        this.aliens.add(alien);
        alien.init();

        if (AlienClass.name === "Alien5") {
            alien.on("destroy", () => {
                this.scene.events.removeAllListeners();

                // this.scene.time.delayedCall(500, () => {
                this.scene.scene.start("GameWin");
                // });
            });
        }
    }

    getAlienGroup() {
        return this.aliens;
    }
}

