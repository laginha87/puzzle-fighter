import { MatchLogic } from '~/src/logic/MatchLogic';
import { PlayerView } from '~/src/view/PlayerView';
import blocksJson from '~/assets/blocks.json';
import blocksPng from '~/assets/blocks.png';


export class MatchView extends Phaser.Scene {
    public logic!: MatchLogic;
    public players!: PlayerView[];

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

    public update(time: number, delta: number) {
        this.logic.update(time, delta);
        this.players.forEach(e => e.update(time, delta));
    }
}

// WORKING ON RENDERING THE BOARD ACCORDING TO SIZE