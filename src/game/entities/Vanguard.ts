export class Vangaurd extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "vanguard");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.25, 0.5);
        this.setDepth(1);
    }

    public anim() {
        if (!this.anims.exists("vanguard")) {
            this.anims.create({
                key: "vanguard",
                frames: this.anims.generateFrameNumbers("vanguard", {
                    start: 0,
                    end: 10,
                }),
                frameRate: 20,
                repeat: -1, // -1 means loop indefinitely
            });
        }

        // Only start the animation if it's not already playing
        if (!this.anims.isPlaying) {
            this.play("vanguard");
        }
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

