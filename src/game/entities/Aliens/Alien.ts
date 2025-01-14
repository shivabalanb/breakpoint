export abstract class Alien extends Phaser.Physics.Arcade.Sprite {
    protected _name: string;
    public _health: number;
    public _speed: number;
    protected _scale: number;
    protected _damage: number;
    public _isInvincible: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene.time.delayedCall(500, () => {
            this._isInvincible = false;
        });
    }

    init() {
        if (!this.scene) {
            throw new Error(
                "Scene is undefined. Make sure the Alien is properly added to a scene."
            );
        }
        this.move();
    }

    setSpeed(speed: number) {
        this._speed = speed;
    }

    getDamage() {
        return this._damage;
    }

    getHealth() {
        return this._health;
    }

    public takeDamage(amount: number) {
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

