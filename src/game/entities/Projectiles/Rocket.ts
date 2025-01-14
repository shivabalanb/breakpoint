import { Scene } from "phaser";
import { Projectile } from "./Projectile";
import { Alien } from "../Aliens/Alien";

export class Rocket extends Projectile {
    private aliens: Phaser.Physics.Arcade.Group;
    private _explosionRadius: number;
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "rocket");

        this._scale = 0.5;
        this._speed = 500;
        this._damage = 200;
        this._explosionRadius = 400;
    }
}

