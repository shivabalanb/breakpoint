import { Alien } from "./Alien";

export class Alien1 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = Phaser.Math.Between(100, 300);
        super(scene, x, y, "alien1");

        this._name = "scythe";
        this._health = 200;
        this._speed = 80;
        this._scale = 1.4;
        this._damage = 50;

        // animaiton
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("alien1", {
                start: 0,
                end: 10,
            }),
            frameRate: 2,
            repeat: -1,
        });

        this.setScale(this._scale);
        const radius = (this.width * 0.5) / 2; // 70% of sprite width
        this.body?.setCircle(radius);
        this.body?.setOffset(0, 30);
    }

    move() {
        this.scene.tweens.killTweensOf(this);
        this.alpha = 1;
        this.play("walk");

        // movement
        this.scene.tweens.add({
            targets: this,
            y: this.y + 100,
            duration: 500,
            ease: "Expo",
            yoyo: true,
            repeat: -1,
        });

        const randomSpeed = Phaser.Math.Between(60, this._speed);
        this.setVelocityX(-randomSpeed);
    }
}

