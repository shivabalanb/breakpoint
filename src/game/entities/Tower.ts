export class Tower extends Phaser.Physics.Arcade.Sprite {
    public health: number = 100;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "tower");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setOrigin(0, 0);
        this.body?.setOffset(-5, 0);

        this.anim();
    }

    anim() {
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("tower", {
                start: 0,
                end: 10,
            }),
            frameRate: 10,
            // repeat: -1,
        });

        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.play("idle");
            },
            loop: true,
        });
    }

    public takeDamage(amount: number) {
        this.health = Math.max(0, this.health - amount);

        if (this.health <= 0) {
            this.scene.tweens.add({
                targets: this,
                alpha: 0.3,
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    this.scene.scene.start("GameOver");
                },
            });
        } else {
            this.scene.tweens.add({
                targets: this,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
            });
        }
    }
}

