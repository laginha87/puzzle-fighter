import { PlayerLogic } from '~/src/logic/PlayerLogic';
import { SceneState } from '~src/view/Types';
import { BoardView } from '~/src/view/BoardView';
import { BlockLogic } from '~src/logic';
import { BlockView } from './BlockView';

export class PlayerView implements SceneState {
    public scene!: Phaser.Scene;

    constructor(public logic: PlayerLogic, public board: BoardView) {
        this.logic.events.on('block_added', (logic : BlockLogic) => {
            const view = new BlockView(logic);
            view.scene = this.scene;
            view.create();
        })
    }

    public init() {
    }

    public preload() {
        this.board.preload();
    }

    public create() {
        this.board.create();
    }

    update(time: number, delta: number) {
        this.board.update(time, delta);
    }
}
