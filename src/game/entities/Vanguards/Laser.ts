import { Scene } from "phaser";
import { Alien } from "../Aliens/Alien";
import { Vanguard } from "./Vanguard";

export class Laser extends Vanguard {
    public _damage: number;

    public laserLine: Phaser.GameObjects.Line;
    public laserLength: number = 1000;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        projectiles: Phaser.Physics.Arcade.Group
    ) {
        super(scene, x, y, "vanguard_l", projectiles);
        this._name = "vanguard_l";
        this._damage = 250;

        this._isReloading = false;
        this._fireRate = 10000;

        this.laserLine = scene.add.line(0, 0, 0, 0, 0, 0, 0xff000);
        this.laserLine.setLineWidth(5);
        this.laserLine.setVisible(false);

        this.anims.create({
            key: this._name,
            frames: this.anims.generateFrameNumbers(this._name, {
                start: 0,
                end: 6,
            }),
            frameRate: 20,
        });
    }

    shoot(x: number, y: number, rotation: number): void {
        this.scene.sound.play("laserSound", {
            seek: 0.8,
            rate: 2,
        });

        const endX = x + Math.cos(rotation) * this.laserLength;
        const endY = y + Math.sin(rotation) * this.laserLength;

        this.laserLine.setTo(x, y, endX, endY);
        this.laserLine.setVisible(true);

        const line = new Phaser.Geom.Line(x, y, endX, endY);

        const aliens = this.scene.physics.world.bodies
            .getArray()
            .filter((body) => body.gameObject instanceof Alien);

        aliens.forEach((alienBody) => {
            const alien = alienBody.gameObject as Alien;

            const alienBounds = alien.getBounds();

            if (
                Phaser.Geom.Intersects.LineToRectangle(
                    line,
                    new Phaser.Geom.Rectangle(
                        alienBounds.x,
                        alienBounds.y,
                        alienBounds.width,
                        alienBounds.height
                    )
                )
            ) {
                alien.takeDamage(this._damage);
            }
        });

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

