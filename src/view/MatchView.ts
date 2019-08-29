import blocksJson from 'assets/blocks.json';
import blocksPng from 'assets/blocks.png';
import stage1Png from 'assets/stage_1.png';
import { MatchLogic } from 'src/logic';
import { PlayerView } from 'src/view';
import { KeyboardController, AiController } from 'src/controllers';


export class MatchView extends Phaser.Scene {
    public logic!: MatchLogic;
    public players!: PlayerView[];
    private started = false;

    public init() {
        this.players.forEach(e => e.init());
    }

    public preload() {
        this.load.atlas('blocks', blocksPng, blocksJson);
        this.load.image('stage-1', stage1Png);
        this.players.forEach((e) => {
            let controller;
            if(e.logic.type === 'ai') {
                controller = new AiController(this.logic, e.logic);
            } else {
                controller = new KeyboardController(this.input);
            }
            e.logic.controller = controller;
        });

        this.players.forEach(e => e.preload());
    }

    public create() {
        const image = this.add.image(1920 / 2, 1080 / 2,'stage-1');

        image.setScale(1920 / image.displayWidth, 1080 / image.displayHeight);
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