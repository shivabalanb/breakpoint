import { Math, Scene } from "phaser";
import { Alien } from "./Aliens/Alien";
import { Alien0 } from "./Aliens/Alien0";
import { Alien1 } from "./Aliens/Alien1";
import { Alien2 } from "./Aliens/Alien2";
import { Alien3 } from "./Aliens/Alien3";
import { Alien4 } from "./Aliens/Alien4";
import { Alien5 } from "./Aliens/Alien5";

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
            delay: 30000,
            callback: () => {
                this.wave++;
                this.startSpawning();
            },
            callbackScope: this,
            loop: true,
        });
    }

    private startSpawning() {
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);
        this.spawnAlien(Alien5);

        // switch (this.wave) {
        //     case 1:
        //         this.startWave1_0();
        //         break;
        //     case 2:
        //         this.startWave2();
        //         break;
        //     default:
        //         break;
        // }
    }

    private startWave1_0() {
        this.scene.time.addEvent({
            delay: Math.Between(1000, 2000),
            callback: () => this.spawnAlien(Alien0),
            callbackScope: this,
            repeat: 10,
        });

        this.scene.time.addEvent({
            delay: 20000,
            callback: () => this.spawnAlien(Alien1),
            callbackScope: this,
        });
    }

    private startWave1_1() {
        this.scene.time.addEvent({
            delay: Math.Between(500, 1000),
            callback: () => this.spawnAlien(Alien0),
            callbackScope: this,
            repeat: 20,
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

