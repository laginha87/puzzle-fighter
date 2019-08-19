import blocksJson from 'assets/blocks.json';
import blocksPng from 'assets/blocks.png';
import stage from 'assets/stage_1.png';
import { MatchLogic } from 'src/logic';
import { PlayerView } from 'src/view';
import { KeyboardController } from 'src/controllers';


export class MatchView extends Phaser.Scene {
    public logic!: MatchLogic;
    public players!: PlayerView[];
    private started = false;

    public init() {
        this.players.forEach(e => e.init());
    }

    public preload() {
        this.load.atlas('blocks', blocksPng, blocksJson);
        this.load.image('stage-1', stage);
        this.players.forEach((e) => {
            const controller = new KeyboardController(this.input);
            e.logic.controller = controller;
        });

        this.players.forEach(e => e.preload());
    }

    public create() {
        this.add.image(400,300,'stage-1');
        this.players.forEach(e => e.create());
    }

    public start() {
        this.logic.start();
    }

    public update(time: number, delta: number) {
        if(!this.started) {
            this.start();
            this.started = true;
        }
        this.logic.update(time, delta);
        this.players.forEach(e => e.update(time, delta));
    }
}