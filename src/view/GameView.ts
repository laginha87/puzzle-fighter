import * as Phaser from 'phaser';
import { GameLogic } from 'src/logic';

export class GameView {
    public phaser!: Phaser.Game;
    constructor(private logic: GameLogic) {

    }

    public init(elem: HTMLElement) {
        const config: GameConfig = {
            type: Phaser.AUTO,
            width: 1280,
            height: 800,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 },
                },
            },
            parent: elem,
        };
        this.phaser = new Phaser.Game(config);
    }

    public start() {
    }
}
