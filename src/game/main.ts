import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { GameWin } from "./scenes/GameWin";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 700,
    parent: "game-container",
    backgroundColor: "#028af8",
    physics: {
        default: "arcade",

        arcade: {
            gravity: {
                y: 0,
                x: 0,
            },
            debug: true,
        },
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game horizontally and vertically
    },
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver, GameWin],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;

