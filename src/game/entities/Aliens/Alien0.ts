import { Alien } from "./Alien";

export class Alien0 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = Phaser.Math.Between(
            scene.cameras.main.height - 120,
            scene.cameras.main.height - 180
        );
        super(scene, x, y, "alien0");

        this._name = "voidling";
        this._health = 100;
        this._speed = 100;
        this._scale = 1.2;
        this._damage = 20;

        // animaiton
        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("alien0", {
                start: 0,
                end: 10,
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
            y: this.y - 10,
            duration: 300,
            ease: "Power1",
            yoyo: true,
            repeat: -1,
        });

        const randomSpeed = Phaser.Math.Between(20, this._speed);
        // this.setVelocityX(-randomSpeed);
        this.setVelocityX(-1);
    }
}
