import blocksJson from '~/assets/blocks.json';
import blocksPng from '~/assets/blocks.png';
import { MatchLogic } from '~src/logic';
import { PlayerView } from '~src/view';


export class MatchView extends Phaser.Scene {
    public logic!: MatchLogic;
    public players!: PlayerView[];
    private started = false;

    public init() {
        this.players.forEach(e => e.init());
    }

    public preload() {
        const img = document.createElement('img');
        img.src = blocksPng;
        this.textures.addAtlasJSONHash('blocks', img, blocksJson);

        this.players.forEach(e => e.preload());
    }

    public create() {
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