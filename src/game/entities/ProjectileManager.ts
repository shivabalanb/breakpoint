import { Bullet } from "./Projectiles/Bullet";
// import { Laser } from "./Projectiles/Laser";
import { Projectile } from "./Projectiles/Projectile";
import { Rocket } from "./Projectiles/Rocket";
// import { GunType } from "./Deprecated";

export class ProjectileManager {
    private scene: Phaser.Scene;
    private projectiles: Phaser.Physics.Arcade.Group;
    // private laser: Laser;
    // public gunType: GunType;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.projectiles = scene.physics.add.group({
            classType: Projectile,
        });
        // this.laser = new Laser(scene);
        // this.gunType = GunType.MACHINE_GUN;
    }

    // public changeProjectile(gunType: GunType) {
    //     this.gunType = gunType;
    // }

    // shoot(x: number, y: number, rotation: number) {
    //     if (this.gunType == GunType.LASER) {
    //         this.laser.shoot(x, y, rotation);
    //     }

    //     let projectile: Projectile;
    //     switch (this.gunType) {
    //         case GunType.MACHINE_GUN:
    //             projectile = new Bullet(this.scene, x, y);
    //             break;
    //         case GunType.ROCKET_LAUNCHER:
    //             projectile = new Rocket(this.scene, x, y);
    //             break;
    //         default:
    //             return;
    //     }

    //     this.projectiles.add(projectile, true);

    //     projectile.setScale(projectile._scale);
    //     projectile.setRotation(rotation);
    //     this.scene.physics.velocityFromRotation(
    //         rotation,
    //         projectile._speed,
    //         projectile.body?.velocity
    //     );
    // }

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

