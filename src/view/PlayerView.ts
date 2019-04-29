import { PlayerLogic } from '~/src/logic/PlayerLogic';
import { SceneState } from '~src/view/Types';
import { BoardView } from '~/src/view/BoardView';

export class PlayerView implements SceneState {
    public scene!: Phaser.Scene;

    constructor(public logic: PlayerLogic, public board: BoardView) {

    }

    public init() {
    }

    public preload() {
        this.board.preload()
    }

    public create() {
        this.board.create()
    }

}
