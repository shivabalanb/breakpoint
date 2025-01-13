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

        this.load.spritesheet(
            "bg",
            "bg_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/ground.png"
            {
                frameWidth: 1024,
                frameHeight: 700,
            }
        );
        this.load.spritesheet(
            "tower",
            "tower_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/tower.png"
            {
                frameWidth: 150,
                frameHeight: 650,
            }
        );

        // vangaurd
        this.load.spritesheet(
            "vanguard_m",
            "vanguard_m_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/gun.png"
            {
                frameWidth: 150,
                frameHeight: 75,
            }
        );
        this.load.spritesheet(
            "vanguard_r",
            "vanguard_r_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/gun.png"
            {
                frameWidth: 150,
                frameHeight: 75,
            }
        );
        this.load.spritesheet(
            "vanguard_l",
            "vanguard_l_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/gun.png"
            {
                frameWidth: 150,
                frameHeight: 75,
            }
        );

        // projectiles
        this.load.image(
            "bullet",
            "bullet.png"
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/star.png"
        );
        this.load.image(
            "rocket",
            "rocket.png"
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/star.png"
        );

        this.load.spritesheet("explosion", "explosion_spritesheet.png", {
            frameWidth: 100,
            frameHeight: 100,
        });

        // aliens
        this.load.spritesheet(
            "alien0",
            "alien0_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien1",
            "alien1_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien2",
            "alien2_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien3",
            "alien3_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet(
            "alien4",
            "alien4_spritesheet.png",
            // "https://d2oy80xbq8q7r8.cloudfront.net/public/assets/alien0.png",
            {
                frameWidth: 64,
                frameHeight: 64,
            }
        );
        this.load.spritesheet("alien5", "alien5_spritesheet.png", {
            frameWidth: 200,
            frameHeight: 128,
        });
    }

    create() {
        this.scene.start("Game");
    }
}

