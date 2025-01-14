import { GameObjects, Scene } from "phaser";
import { EventBus } from "../EventBus";

export class HowToPlay extends Scene {
    private readyButton: GameObjects.Text;
    private readyButtonBg: GameObjects.Graphics;
    private title: GameObjects.Text;
    private instructionsImage: GameObjects.Image; // New image object

    constructor() {
        super("HowToPlay");
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor(0x000000);

        // Add title
        this.title = this.add
            .text(512, 100, "MISSION BRIEFING: LAST STAND", {
                fontFamily: "Arial Black",
                fontSize: 50,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        // Add instructions image
        this.instructionsImage = this.add
            .image(
                512, // x center
                350, // y position (adjust as needed)
                "how_to_play" // key of your loaded image
            )
            .setOrigin(0.5)
            .setDepth(100);

        // You might want to scale the image to fit
        // this.instructionsImage.setScale(0.8); // adjust scale as needed

        // Create ready button (rest of your button code...)
        const buttonWidth = 250;
        const buttonHeight = 100;
        const centerX = this.cameras.main.centerX - buttonWidth / 2;
        const centerY = 550;

        // Add button background with black tint
        this.readyButtonBg = this.add.graphics().setDepth(99);

        this.drawButton(centerX, centerY, buttonWidth, buttonHeight);

        // Add ready button text
        this.readyButton = this.add
            .text(512, 600, "READY!", {
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

        // Button interactions remain the same...
        this.readyButton.on("pointerover", () => {
            this.readyButton.setScale(1.2);
            this.readyButton.setColor("#ffff00");
            this.drawButton(
                centerX - 12,
                centerY - 12,
                buttonWidth + 24,
                buttonHeight + 24
            );
        });

        this.readyButton.on("pointerout", () => {
            this.readyButton.setScale(1);
            this.readyButton.setColor("#ffffff");
            this.drawButton(centerX, centerY, buttonWidth, buttonHeight);
        });

        this.readyButton.on("pointerdown", () => {
            this.readyButton.setScale(1.1);
            this.drawButton(centerX, centerY, buttonWidth, buttonHeight, true);
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => this.startGame());
        });

        // Entrance animations
        this.cameras.main.fadeIn(1000);
        this.title.setAlpha(0);
        this.readyButton.setAlpha(0);
        this.readyButtonBg.setAlpha(0);
        this.instructionsImage.setAlpha(0);

        // Animate title
        this.tweens.add({
            targets: this.title,
            alpha: 1,
            y: { from: 50, to: 100 },
            duration: 1000,
            ease: "Power2",
        });

        // Animate instructions image
        this.tweens.add({
            targets: this.instructionsImage,
            alpha: 1,
            y: { from: 300, to: 350 },
            duration: 1000,
            ease: "Power2",
            delay: 200,
        });

        // Animate ready button
        this.tweens.add({
            targets: [this.readyButton, this.readyButtonBg],
            alpha: 1,
            y: { from: 650, to: 600 },
            duration: 1000,
            ease: "Power2",
            delay: 1000,
        });

        EventBus.emit("current-scene-ready", this);
    }

    // Your existing drawButton and startGame methods remain the same
    private drawButton(
        x: number,
        y: number,
        width: number,
        height: number,
        isPressed: boolean = false
    ) {
        // ... existing drawButton code ...
    }

    private startGame() {
        this.scene.start("Game");
    }
}

