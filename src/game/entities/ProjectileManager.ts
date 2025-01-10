import { Bullet } from "./Projectiles/Bullet";
import { Laser } from "./Projectiles/Laser";
import { Projectile } from "./Projectiles/Projectile";
import { Rocket } from "./Projectiles/Rocket";
import { GunType } from "./Vanguard";

export class ProjectileManager {
    private scene: Phaser.Scene;
    private projectiles: Phaser.Physics.Arcade.Group;
    private projectile: Projectile;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.projectiles = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
        });

        this.projectile = new Bullet(this.scene, this.projectiles);
    }

    public changeProjectile(gunType: GunType) {
        switch (gunType) {
            case GunType.MACHINE_GUN:
                this.projectile = new Bullet(this.scene, this.projectiles);
                break;
            case GunType.ROCKET_LAUNCHER:
                this.projectile = new Rocket(this.scene, this.projectiles);
                break;
            case GunType.LASER:
                this.projectile = new Laser(this.scene, this.projectiles);
                break;
            default:
                break;
        }
    }

    shoot(x: number, y: number, rotation: number) {
        this.projectile.shoot(x, y, rotation);
    }

    cleanup() {
        this.projectiles.children.each(
            (bullet: Phaser.GameObjects.GameObject) => {
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
            }
        );
    }

    getProjectileGroup() {
        return this.projectiles;
    }
}

