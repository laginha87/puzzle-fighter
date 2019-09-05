import blocksJson from 'assets/blocks.json';
import blocksPng from 'assets/blocks.png';
import { MatchLogic } from 'src/logic';
import { PlayerView, StageView } from 'src/view';
import { KeyboardController, AiController } from 'src/controllers';


export class MatchView extends Phaser.Scene {
    public logic!: MatchLogic;
    public players!: PlayerView[];
    public stage!: StageView;

    private started = false;

    public init() {
        this.players.forEach(e => e.init());
        this.stage.init();
    }

    public preload() {
        this.load.atlas('blocks', blocksPng, blocksJson);
        this.stage.preload();
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
        this.stage.create();
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
        this.stage.update(time, delta);
    }
}