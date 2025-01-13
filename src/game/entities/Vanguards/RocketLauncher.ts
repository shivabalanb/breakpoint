import { Scene } from "phaser";
import { Vanguard } from "./Vanguard";
import { Bullet } from "../Projectiles/Bullet";
import { Rocket } from "../Projectiles/Rocket";

export class RocketLauncher extends Vanguard {
    constructor(
        scene: Scene,
        x: number,
        y: number,
        projectiles: Phaser.Physics.Arcade.Group
    ) {
        super(scene, x, y, "vanguard_r", projectiles);

        this._maxAmmo = 3;
        this._ammo = this._maxAmmo;
        this._fireRate = 400;
        this._reloadTime = 5000;

        this.anims.create({
            key: "vanguard_r",
            frames: this.anims.generateFrameNumbers("vanguard_r", {
                start: 0,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    shoot(x: number, y: number, rotation: number) {
        this.anim("vanguard_r");

        this._ammo--;
        let projectile = new Rocket(this.scene, x, y);
        this.projectiles.add(projectile, true);

        projectile.setScale(projectile._scale);
        projectile.setRotation(rotation);
        this.scene.physics.velocityFromRotation(
            rotation,
            projectile._speed,
            projectile.body?.velocity
        );
        this._lastFired = this.scene.time.now;

        if (this._ammo == 0) {
            console.log("reloading");
            this._isReloading = true;
            this._isFiring = false;
            this.scene.time.delayedCall(this._reloadTime, () => {
                console.log("done reloading!");

                this._ammo = this._maxAmmo;
                this._isReloading = false;
            });
        }
    }
}

