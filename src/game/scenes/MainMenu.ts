import { GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";

// MainMenu.ts
export class MainMenu extends Scene {
    background: GameObjects.Image;
    title: GameObjects.Text;
    playButton: GameObjects.Text;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.cameras.main.setBackgroundColor(0x0000);

        // Add background with tint
        this.background = this.add.image(0, -100, "main_menu").setOrigin(0, 0);

        // Add title text
        this.title = this.add
            .text(512, 250, "BREAKPOINT", {
                fontFamily: "Arial Black",
                fontSize: 74,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.add
            .graphics()
            .setDepth(99) // Just below text depth
            .fillStyle(0x00d9ff, 0.8) // Blue color
            .fillRect(this.cameras.main.centerX - 250 / 2, 550, 250, 100);

        // Enhanced play button
        this.playButton = this.add
            .text(512, 400, "Play", {
                fontFamily: "Arial Black",
                fontSize: 48,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setInteractive();

        // Add hover effects
        this.playButton.on("pointerover", () => {
            this.playButton.setScale(1.2);
            this.playButton.setColor("#ffff00");
        });

        this.playButton.on("pointerout", () => {
            this.playButton.setScale(1);
            this.playButton.setColor("#ffffff");
        });

        this.playButton.on("pointerdown", () => {
            this.playButton.setScale(2);
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => this.changeScene());
        });

        // Add entrance animation
        this.cameras.main.fadeIn(1000);
        this.title.setAlpha(0);
        this.playButton.setAlpha(0);

        this.tweens.add({
            targets: this.title,
            alpha: 1,
            y: { from: 200, to: 250 },
            duration: 1000,
            ease: "Power2",
        });

        this.tweens.add({
            targets: this.playButton,
            alpha: 1,
            y: { from: 500, to: 600 },
            duration: 1000,
            ease: "Power2",
            delay: 200,
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("HowToPlay");
    }
}

