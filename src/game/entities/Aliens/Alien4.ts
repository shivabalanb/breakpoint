import { Alien } from "./Alien";

export class Alien4 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = scene.cameras.main.width;
        const y = Phaser.Math.Between(100, 300);

        super(scene, x, y, "alien4");

        this._name = "trilox";
        this._health = 250;
        this._speed = 60;
        this._scale = 1.5;
        this._damage = 200;

        // animaiton
        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("alien4", {
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
        const amplitude = 20; // Distance to zig-zag up and down
        const frequency = 0.05; // Speed of the zig-zag pattern
        const forwardSpeed = 1; // Speed of forward movement

        this.scene.time.addEvent({
            delay: 30, // ~60 FPS
            loop: true,
            callback: () => {
                // Update x position for forward movement
                this.x -= forwardSpeed;

                // Update y position for zig-zag
                this.y += Math.sin(this.x * frequency) * amplitude;
            },
        });

        const randomSpeed = Phaser.Math.Between(30, this._speed);
        // this.setVelocityX(-randomSpeed);
        this.setVelocityX(-1);
    }
}

