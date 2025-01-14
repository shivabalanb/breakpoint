import { Alien } from "./Alien";

export class Alien5 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = Phaser.Math.Between(100, 300);

        super(scene, x, y, "alien5");

        this._name = "dravok";
        this._health = 2000;
        this._speed = 20;
        this._scale = 1.8;
        this._damage = 500;

        // animaiton
        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("alien5", {
                start: 0,
                end: 12,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.setScale(this._scale);
        const radius = (this.width * 0.2) / 2;
        this.body?.setCircle(
            radius,
            (this.width - radius * 8) / 2, // X offset to center
            (this.height - radius * 0.3) / 2 // Y offset to center
        );
    }

    move() {
        this.play("move");
        // movement
        this.scene.tweens.add({
            targets: this,
            y: this.y + 5,
            duration: 500,
            ease: "Linear",
            yoyo: true,
            repeat: -1,
        });

        const randomSpeed = Phaser.Math.Between(30, this._speed);
        // this.setVelocityX(-randomSpeed);
        this.setVelocityX(-1);
    }
}

