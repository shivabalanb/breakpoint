import { Alien } from "./Alien";

export class Alien3 extends Alien {
    constructor(scene: Phaser.Scene) {
        const x = Phaser.Math.Between(
            scene.cameras.main.width + 50,
            scene.cameras.main.width
        );
        const y = Phaser.Math.Between(100, 300);

        super(scene, x, y, "alien3");

        this._name = "zix";
        this._health = 50;
        this._speed = 80;
        this._scale = 1;
        this._damage = 250;

        // animaiton
        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("alien3", {
                start: 0,
                end: 7,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.setScale(this._scale);
        this.body?.setSize(this.width * 0.7, this.height * 0.5, true);

    }

    move() {
        this.play("move");

        // movement
        const radius = 5; // Radius of circular motion
        let angle = 0; // Start angle in radians
        const angularSpeed = 0.1; // Speed of rotation (radians per update)
        const forwardSpeed = 1; // Speed of forward movement

        this.scene.time.addEvent({
            delay: 30,
            loop: true,
            callback: () => {
                // Increment angle for circular motion
                angle += angularSpeed;

                // Calculate new position
                this.x += Math.cos(angle) * radius - forwardSpeed;
                this.y += Math.sin(angle) * radius;
            },
        });

        const randomSpeed = Phaser.Math.Between(5, this._speed);
        // this.setVelocityX(-randomSpeed);
        this.setVelocityX(-1);
    }
}

