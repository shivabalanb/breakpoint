import { Alien } from "./Alien";

export class Alien1 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = 250;
        super(scene, x, y, "alien0", 100);
    }

    walk() {
        // animaiton
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("alien0", {
                start: 0,
                end: 3,
            }),
            frameRate: 2,
            repeat: -1,
        });

        this.play("walk");

        // movement
        this.scene.tweens.add({
            targets: this,
            y: this.y + 50,
            duration: 500,
            ease: "Expo",
            yoyo: true,
            repeat: -1,
        });

        const randomSpeed = Phaser.Math.Between(120, 60);
        this.setVelocityX(-randomSpeed);
    }
}
