export class Vangaurd extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "gun");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.25, 0.5);
        this.setDepth(1);
    }

    rotateToPointer(pointer: Phaser.Input.Pointer) {
        const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            pointer.x,
            pointer.y
        );

        this.setRotation(angle);
    }
}

