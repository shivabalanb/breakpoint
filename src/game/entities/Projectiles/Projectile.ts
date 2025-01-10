import { Scene } from "phaser";

export abstract class Projectile {
    protected _scale: number;
    protected _fireRate: number;
    protected _speed: number;
    protected _damage: number;
    protected _lastFired: number;
    scene: Scene;
    projectiles: Phaser.GameObjects.Group;

    constructor(scene: Scene, projectiles: Phaser.GameObjects.Group) {
        this.scene = scene;
        this.projectiles = projectiles;
    }

    abstract shoot(x: number, y: number, rotation: number): void;
}

