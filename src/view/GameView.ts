import * as Phaser from 'phaser';
import { GameLogic } from '~src/logic';

export class GameView {
    public phaser!: Phaser.Game;
    constructor(private logic: GameLogic) {

    }

    public init(elem: HTMLElement) {
        const config: GameConfig = {
            type: Phaser.AUTO,
            width: 1920,
            height: 1080,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 },
                },
            },
            parent: elem,
            zoom: window.innerWidth / 1920
        };
        this.phaser = new Phaser.Game(config);
    }

    public start() {
    }
}
