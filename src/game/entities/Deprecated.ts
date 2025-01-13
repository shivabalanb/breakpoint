import { ProjectileManager } from "./ProjectileManager";

export enum VanguardType {
    MACHINE_GUN,
    ROCKET_LAUNCHER,
    LASER,
}

export const GunTextures = new Map<VanguardType, [string, string | null]>([
    [VanguardType.MACHINE_GUN, ["vanguard_m", "bullet"]],
    [VanguardType.ROCKET_LAUNCHER, ["vanguard_r", "rocket"]],
    [VanguardType.LASER, ["vanguard_l", null]],
]);

export class Vangaurd extends Phaser.Physics.Arcade.Sprite {
    private projectileManager: ProjectileManager;
    private gunIndex: number = 0;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        projectileManager: ProjectileManager
    ) {
        // const gunTexture = GunTextures.get(GunType.MACHINE_GUN)![0];
        super(scene, x, y, 'gunTexture');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.projectileManager = projectileManager;
        // this.gunIndex = GunType.MACHINE_GUN;
        this.setOrigin(0.25, 0.5);
        this.setDepth(1);
    }

    public anim() {
        // Only start the animation if it's not already playing
        if (!this.anims.isPlaying) {
            this.play("vanguard");
        }
    }

    // changeGun(direction: Direction) {
    //     if (direction == Direction.LEFT) {
    //         if (this.gunIndex == 0) {
    //             this.gunIndex = 2;
    //         } else {
    //             this.gunIndex--;
    //         }
    //     } else {
    //         if (this.gunIndex == 2) {
    //             this.gunIndex = 0;
    //         } else {
    //             this.gunIndex++;
    //         }
    //     }
    //     const gunTexture = GunTextures.get(this.gunIndex)![0];
    //     this.setTexture(gunTexture);

    //     this.anims.remove("vanguard");
    //     this.anims.create({
    //         key: "vanguard",
    //         frames: this.anims.generateFrameNumbers(
    //             GunTextures.get(this.gunIndex)![0],
    //             {
    //                 start: 0,
    //                 end: 5,
    //             }
    //         ),
    //         frameRate: 20,
    //         repeat: -1,
    //     });

    //     this.projectileManager.changeProjectile(this.gunIndex as GunType);
    // }

    rotateToPointer(pointer: Phaser.Input.Pointer) {
        const angle = Phaser.Math.Clamp(
            Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y),
            -0.4,
            0.4
        );

        this.setRotation(angle);
    }

    // moveVertical(direction: Direction) {
    //     const currentY = this.y;
    //     const step = direction == Direction.UP ? -20 : 20;

    //     if (!(currentY + step < 200 || currentY + step > 600)) {
    //         this.y += step;
    //     }
    // }
}

