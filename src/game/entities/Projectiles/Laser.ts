import { Scene } from "phaser";
import { Projectile } from "./Projectile";

export class Laser extends Projectile {
    private laserLine: Phaser.GameObjects.Line;
    private laserLength: number = 1000;

    constructor(scene: Scene, projectiles: Phaser.GameObjects.Group) {
        super(scene, projectiles);

        this._scale = 0.5;
        this._fireRate = 500;
        this._speed = 1000;
        this._damage = 100;
        this._lastFired = 0;

        this.laserLine = scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000);
        this.laserLine.setLineWidth(10);
        this.laserLine.setVisible(false);
    }

    shoot(x: number, y: number, rotation: number): void {
        if (this.scene.time.now > this._lastFired + this._fireRate) {
            const endX = x + Math.cos(rotation) * this.laserLength;
            const endY = y + Math.sin(rotation) * this.laserLength;

            this.laserLine.setTo(x, y, endX, endY);
            this.laserLine.setVisible(true);

            // Optional: Add fade out effect
            this.scene.tweens.add({
                targets: this.laserLine,
                alpha: 0,
                duration: 100,
                onComplete: () => {
                    this.laserLine.setVisible(false);
                    this.laserLine.setAlpha(1);
                },
            });

            this._lastFired = this.scene.time.now;
        }
    }
}

