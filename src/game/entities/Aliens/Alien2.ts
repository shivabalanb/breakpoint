import { Alien } from "./Alien";

export class Alien2 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = Phaser.Math.Between(
            scene.cameras.main.height - 120,
            scene.cameras.main.height - 180
        );

        super(scene, x, y, "alien2");

        this._name = "pinecryst";
        this._health = 500;
        this._speed = 20;
        this._scale = 1.6;
        this._damage = 150;

        // animaiton
        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("alien2", {
                start: 0,
                end: 10,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.setScale(this._scale);
        this.body?.setSize(this.width * 0.6, this.height * 0.5, true);
        this.body?.setOffset(
            (this.width - this.width * 0.6) / 2, // This centers the physics body horizontally
            this.height * 0.3 // This moves the physics body down
        );
    }

    move() {
        this.play("move");

        // movement
        this.scene.tweens.add({
            targets: this,
            y: this.y - 2,
            duration: 300,
            ease: "Power1",
            yoyo: true,
            repeat: -1,
        });

        const randomSpeed = Phaser.Math.Between(15, this._speed);
        this.setVelocityX(-randomSpeed);
        // this.setVelocityX(-1);
    }
}

