import * as Phaser from 'phaser';
import { GameLogic } from '~src/logic';

export class GameView {
    public phaser!: Phaser.Game;
    constructor(private logic: GameLogic) {

    }

    public init(elem: HTMLElement) {
        const config: GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
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

class Temp extends Phaser.Scene {
    public logic: GameLogic;

    constructor(config: string, logic: GameLogic) {
        super(config);

        this.logic = logic;
    }
    public preload() {

        const tiles = ['chaos.ase', 'elemental.ase', 'nature.ase', 'order.ase', 'willpower.ase'];
        for (let i = 16; i <= 800 - 16; i += 32) {
            for (let ii = 16; ii <= 600 - 16; ii += 32) {
                const type = ['energy', 'regular', 'breaker'][Math.floor(Math.random() * 3)];
                this.add.sprite(i, ii, 'blocks', `${type}_${tiles[Math.floor(Math.random() * tiles.length)]}`);
            }
        }
    }

    public update(time: number, delta: number) {
        this.logic.update(time, delta);
    }
}
