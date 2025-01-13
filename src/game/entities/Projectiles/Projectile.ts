import { Scene } from "phaser";

export abstract class Projectile extends Phaser.Physics.Arcade.Sprite {
    public _scale: number;
    public _speed: number;
    public _damage: number;
    
    constructor(scene: Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
}

