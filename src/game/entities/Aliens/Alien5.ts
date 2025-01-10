import { Alien } from "./Alien";

export class Alien5 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = Phaser.Math.Between(100, 300);

        super(scene, x, y, "alien5");

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
        this.setVelocityX(-randomSpeed);
    }
}

