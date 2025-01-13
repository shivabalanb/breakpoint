import { Scene } from "phaser";
import { Vanguard } from "./Vanguard";
import { Bullet } from "../Projectiles/Bullet";

export class MachineGun extends Vanguard {
    constructor(
        scene: Scene,
        x: number,
        y: number,
        projectiles: Phaser.Physics.Arcade.Group
    ) {
        super(scene, x, y, "vanguard_m", projectiles);

        this._maxAmmo = 50;
        this._ammo = this._maxAmmo;
        this._fireRate = 100;
        this._reloadTime = 5000;

        this.anims.create({
            key: "vanguard_m",
            frames: this.anims.generateFrameNumbers("vanguard_m", {
                start: 0,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    shoot(x: number, y: number, rotation: number) {
        this.anim('vanguard_m')
        this._ammo--;
        let projectile = new Bullet(this.scene, x, y);
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

