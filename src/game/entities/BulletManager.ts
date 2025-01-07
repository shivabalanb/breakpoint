export class BulletManager {
    private bullets: Phaser.Physics.Arcade.Group;
    private scene: Phaser.Scene;
    private lastFired: number = 0;
    private fireRate: number = 100;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.bullets = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
        });
    }

    shoot(x: number, y: number, rotation: number, time: number) {
        if (time > this.lastFired + this.fireRate) {
            const bullet = this.bullets.create(
                x,
                y,
                "star"
            ) as Phaser.Physics.Arcade.Sprite;
            if (bullet) {
                bullet.setScale(0.2);
                bullet.setRotation(rotation);

                const speed = 500;
                this.scene.physics.velocityFromRotation(
                    rotation,
                    speed,
                    bullet.body?.velocity
                );
            }
            this.lastFired = time;
        }
    }

    cleanup() {
        this.bullets.children.each((bullet: Phaser.GameObjects.GameObject) => {
            const b = bullet as Phaser.Physics.Arcade.Sprite;
            if (
                b.x < 0 ||
                b.x > this.scene.cameras.main.width ||
                b.y < 0 ||
                b.y > this.scene.cameras.main.height - 100
            ) {
                b.destroy();
            }
            return true;
        });
    }

    getBulletGroup() {
        return this.bullets;
    }
}

