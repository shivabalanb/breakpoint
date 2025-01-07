export abstract class Alien extends Phaser.Physics.Arcade.Sprite {
    public health: number;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        health: number
    ) {
        super(scene, x, y, texture);
        this.health = health;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init() {
        if (!this.scene) {
            throw new Error(
                "Scene is undefined. Make sure the Alien is properly added to a scene."
            );
        }
        this.setScale(1.2);
        this.walk();
    }

    takeDamage(amount: number) {
        this.health = Math.max(0, this.health - amount);
        if (this.health <= 0) {
            this.scene.tweens.add({
                targets: this,
                alpha: 0.3,
                duration: 500,
                ease: "Power2",
            });
            this.destroy();
        } else {
            this.scene.tweens.add({
                targets: this,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
            });
        }
    }

    abstract walk(): void;
}

