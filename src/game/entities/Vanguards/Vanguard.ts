import { Scene } from "phaser";
import { ProjectileManager } from "../ProjectileManager";

export enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN,
}

export abstract class Vanguard extends Phaser.GameObjects.Sprite {
    public scene: Scene;
    protected projectiles: Phaser.Physics.Arcade.Group;
    public _name: string;
    public _ammo: number;
    public _maxAmmo: number;

    public _isFiring: boolean = false;
    public _fireRate: number;
    public _lastFired: number = this.scene.time.now;

    public _isReloading: boolean = false;
    public _reloadTime: number;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        texture: string,
        projectiles: Phaser.Physics.Arcade.Group
    ) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.setOrigin(0.25, 0.5);
        this.setDepth(1);

        this.projectiles = projectiles;
    }

    abstract shoot(x: number, y: number, rotation: number): any;

    rotateToPointer(pointer: Phaser.Input.Pointer) {
        const angle = Phaser.Math.Clamp(
            Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y),
            -0.4,
            0.4
        );

        this.setRotation(angle);
    }

    moveVertical(direction: Direction) {
        const currentY = this.y;
        const step = direction == Direction.UP ? -20 : 20;

        if (!(currentY + step < 200 || currentY + step > 600)) {
            this.y += step;
        }
    }

    public anim(key: string) {
        if (!this.anims.isPlaying) {
            this.play(key);
        }
    }
}

