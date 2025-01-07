import { Math, Scene } from "phaser";
import { Alien } from "./Aliens/Alien";
import { Alien0 } from "./Aliens/Alien0";
import { Alien1 } from "./Aliens/Alien1";

export class AlienManager {
    private scene: Phaser.Scene;
    private aliens: Phaser.Physics.Arcade.Group;
    private wave: number = 1;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.aliens = scene.physics.add.group({
            classType: Alien,
            runChildUpdate: true,
        });

        this.startSpawning();
        this.scene.time.addEvent({
            delay: 10000,
            callback: () => {
                this.wave++;
                this.startSpawning();
            },
            callbackScope: this,
            loop: false,
        });
    }

    private startSpawning() {
        if (this.wave == 1) {
            this.startWave1();
        } else if (this.wave === 2) {
            this.startWave2();
        }
    }

    private startWave1() {
        this.scene.time.addEvent({
            delay: Math.Between(1000, 2000),
            callback: () => this.spawnAlien(Alien0),
            callbackScope: this,
            repeat: 10,
        });
    }

    private startWave2() {
        this.scene.time.addEvent({
            delay: Math.Between(1000, 1500),
            callback: () => this.spawnAlien(Alien0),
            callbackScope: this,
            repeat: 10,
        });
        this.scene.time.addEvent({
            delay: Math.Between(500, 1000),
            callback: () => this.spawnAlien(Alien1),
            callbackScope: this,
            repeat: 20,
        });
    }

    private spawnAlien<T extends Alien>(AlienClass: new (scene: Scene) => T) {
        const alien = new AlienClass(this.scene);
        this.aliens.add(alien);
        alien.init();
    }

    getAlienGroup() {
        return this.aliens;
    }
}

