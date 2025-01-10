import { Scene } from "phaser";
import { Projectile } from "./Projectile";

export class Bullet extends Projectile {
    constructor(scene: Scene, projectiles: Phaser.GameObjects.Group) {
        super(scene, projectiles);

        this._scale = 0.2;
        this._fireRate = 50;
        this._speed = 500;
        this._damage = 50;
        this._lastFired = 0;
    }

    shoot(x: number, y: number, rotation: number): void {
        if (this.scene.time.now > this._lastFired + this._fireRate) {
            const bullet = this.projectiles.create(
                x,
                y,
                "bullet"
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

