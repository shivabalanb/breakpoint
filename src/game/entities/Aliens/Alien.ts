export abstract class Alien extends Phaser.Physics.Arcade.Sprite {
    protected _health: number;
    protected _speed: number;
    protected _scale: number;
    protected _damage: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init() {
        if (!this.scene) {
            throw new Error(
                "Scene is undefined. Make sure the Alien is properly added to a scene."
            );
        }
        this.move();
    }

    getDamage() {
        return this._damage;
    }

    getHealth() {
        return this._health;
    }

    takeDamage(amount: number) {
        this._health = Math.max(0, this._health - amount);

        if (this._health <= 0) {
            this.scene.tweens.add({
                targets: this,
                alpha: 0.3,
                duration: 500,
                ease: "Power2",
            });
            this.destroy();
        } else {
            if (!this.getData("isHit")) {
                this.setData("isHit", true);

                this.scene.tweens.add({
                    targets: this,
                    alpha: 0.5,
                    duration: 100,
                    yoyo: true,
                    repeat: 2,
                    onComplete: () => {
                        this.setAlpha(1);
                        this.setData("isHit", false);
                    },
                });
            }
        }
    }

    abstract move(): void;
}

