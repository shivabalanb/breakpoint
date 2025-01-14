import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class GameWin extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameWinText: Phaser.GameObjects.Text;
    subText: Phaser.GameObjects.Text;
    constructor() {
        super("GameWin");
    }
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);

        this.background = this.add
            .image(512, 384, "background")
            .setAlpha(0.6)
            .setTint(0x00ff00);

        // Main victory text
        this.gameWinText = this.add
            .text(512, 384, `VICTORY!`, {
                fontFamily: "Arial Black",
                fontSize: 82,
                color: "#ffff00",
                stroke: "#000000",
                strokeThickness: 12,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setAlpha(0);

        // Sub text
        this.subText = this.add
            .text(512, 484, "Mission Accomplished", {
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

        // Animate text entrance
        this.tweens.add({
            targets: this.gameWinText,
            alpha: 1,
            scale: { from: 2, to: 1 },
            duration: 1000,
            ease: "Power2",
        });

        this.tweens.add({
            targets: this.subText,
            alpha: 1,
            y: { from: 550, to: 484 },
            duration: 1000,
            delay: 500,
            ease: "Power2",
        });

        this.time.delayedCall(2000, () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.changeScene());
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}

