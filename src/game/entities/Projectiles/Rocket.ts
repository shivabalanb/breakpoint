import { Scene } from "phaser";
import { Projectile } from "./Projectile";

export class Rocket extends Projectile {
    constructor(scene: Scene, projectiles: Phaser.GameObjects.Group) {
        super(scene, projectiles);

        this._scale = 0.5;
        this._fireRate = 500;
        this._speed = 100;
        this._damage = 100;
        this._lastFired = 0;
    }

    shoot(x: number, y: number, rotation: number): void {
        if (this.scene.time.now > this._lastFired + this._fireRate) {
            const bullet = this.projectiles.create(
                x,
                y,
                "rocket"
            ) as Phaser.Physics.Arcade.Sprite;

            bullet.setScale(this._scale);
            bullet.setRotation(rotation);

            this.scene.physics.velocityFromRotation(
                rotation,
                this._speed,
                bullet.body?.velocity
            );

            this._lastFired = this.scene.time.now;
        }
    }
}

