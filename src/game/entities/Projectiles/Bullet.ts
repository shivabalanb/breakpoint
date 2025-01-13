import { Scene } from "phaser";
import { Projectile } from "./Projectile";

export class Bullet extends Projectile {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "bullet");

        this._scale = 0.2;
        this._speed = 500;
        this._damage = 50;
    }

}

