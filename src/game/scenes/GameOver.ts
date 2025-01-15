import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;
    retryText: Phaser.GameObjects.Text;
    constructor() {
        super("GameOver");
    }
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);

        this.background = this.add
            .image(512, 384, "game_over")
            .setAlpha(0.2)
            .setTint(0xff0000);

        this.gameOverText = this.add
            .text(512, 384, `GAME OVER`, {
                fontFamily: "Arial Black",
                fontSize: 82,
                color: "#ff0000",
                stroke: "#000000",
                strokeThickness: 12,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setAlpha(0);

        this.retryText = this.add
            .text(512, 484, "Returning to menu...", {
                fontFamily: "Arial Black",
                fontSize: 32,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setAlpha(0);

        // Shake effect
        this.cameras.main.shake(500, 0.01);

        // Animate text entrance
        this.tweens.add({
            targets: this.gameOverText,
            alpha: 1,
            scale: { from: 0.5, to: 1 },
            duration: 1000,
            ease: "Bounce",
        });

        this.tweens.add({
            targets: this.retryText,
            alpha: 1,
            duration: 1000,
            delay: 500,
            ease: "Power2",
        });

        // this.time.delayedCall(2000, () => {
        //     this.cameras.main.fade(1000, 0, 0, 0);
        //     this.time.delayedCall(1000, () => this.changeScene());
        // });

        EventBus.emit("current-scene-ready", this);
    }
    changeScene() {
        this.scene.start("MainMenu");
    }
}

