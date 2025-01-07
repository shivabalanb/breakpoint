import { Alien } from "./Alien";

export class Alien0 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = scene.cameras.main.height - 150;
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
            y: this.y - 10,
            duration: 300,
            ease: "Power1",
            yoyo: true,
            repeat: -1,
        });

        const randomSpeed = Phaser.Math.Between(20, 60);
        this.setVelocityX(-randomSpeed);

    }
}