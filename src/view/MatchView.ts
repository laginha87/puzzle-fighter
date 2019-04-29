import { MatchLogic } from '~/src/logic/MatchLogic';
import { PlayerView } from '~/src/view/PlayerView';

export class MatchView extends Phaser.Scene {
    public logic!: MatchLogic;
    public players!: PlayerView[];

    public init() {
        this.players.forEach(e => e.init());
    }

    public preload() {
        this.players.forEach(e => e.preload());
    }


    public create() {
        this.players.forEach(e => e.create());
    }
}

// WORKING ON RENDERING THE BOARD ACCORDING TO SIZE