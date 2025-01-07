import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;

    constructor() {
        super("GameOver");
    }

    create() {
        const score = this.registry.get("score");

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.2);

        this.gameOverText = this.add
            .text(512, 384, `Game Over ${score}`, {
                fontFamily: "Arial Black",
                fontSize: 64,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.time.delayedCall(2000, () => {
            this.changeScene();
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}

