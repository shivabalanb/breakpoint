import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        this.cameras.main.setBackgroundColor(0x456a6b);

        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
        this.load.on("progress", (progress: number) => {
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        this.load.setPath("assets");

        this.load.image(
            "main_menu",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/main_menu.png"
        );

        this.load.image(
            "game_over",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/game_over.png"
        );

        this.load.image(
            "game_won",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/game_won.png"
        );

        this.load.image(
            "how_to_play",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/how_to_play.png"
        );

        this.load.spritesheet(
            "bg",
            // "bg_spritesheet.png",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/bg_spritesheet.png",
            {
                frameWidth: 1024,
                frameHeight: 700,
            }
        );
        this.load.spritesheet(
            "tower",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/tower_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/tower.png"
            {
                frameWidth: 150,
                frameHeight: 650,
            }
        );

        // vangaurd
        this.load.spritesheet(
            "vanguard_m",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/vanguard_m_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/gun.png"
            {
                frameWidth: 150,
                frameHeight: 75,
            }
        );
        this.load.spritesheet(
            "vanguard_r",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/vanguard_r_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/gun.png"
            {
                frameWidth: 150,
                frameHeight: 75,
            }
        );
        this.load.spritesheet(
            "vanguard_l",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/vanguard_l_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/gun.png"
            {
                frameWidth: 150,
                frameHeight: 75,
            }
        );

        // projectiles
        this.load.image(
            "bullet",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/bullet.png"
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/star.png"
        );
        this.load.image(
            "rocket",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/rocket.png"
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/star.png"
        );

        this.load.spritesheet(
            "explosion",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/explosion_spritesheet.png",
            {
                frameWidth: 100,
                frameHeight: 100,
            }
        );

        // aliens
        this.load.spritesheet(
            "alien0",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien1",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien1_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien2",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien2_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien3",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien3_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien4",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien4_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien5",
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien5_spritesheet.png",
            {
                frameWidth: 200,
                frameHeight: 128,
            }
        );

        this.load.audio("machineGunSound", [
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/machine_gun.mp3",
        ]);
        this.load.audio("rocketLauncherSound", [
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/rocket_launcher.mp3",
        ]);
        this.load.audio("laserSound", [
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/laser.mp3",
        ]);
        this.load.audio("explosionSound", [
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/explosion.mp3",
        ]);
        this.load.audio("reloadSound", [
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/reload.mp3",
        ]);
        this.load.audio("backgroundSound", [
            "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/background.mp3",
        ]);
    }

    create() {
        this.scene.start("MainMenu");
    }
}

