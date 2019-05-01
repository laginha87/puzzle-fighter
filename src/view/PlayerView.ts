import { BlockLogic, PlayerLogic, PieceLogic } from '~src/logic';
import { BlockView, BoardView, SceneState, NextPieceView, PieceView } from '~src/view';

export class PlayerView implements SceneState {
    public scene!: Phaser.Scene;
    public next: NextPieceView;
    public piece: PieceView;

    constructor(public logic: PlayerLogic, public board: BoardView) {
        this.logic.events.on('block_added', (logic : BlockLogic) => {
            const view = new BlockView(logic);
            view.scene = this.scene;
            view.create();
        });

        this.logic.events.on('piece_added', ( next : PieceLogic, piece : PieceLogic) => {
            this.piece = this.next.piece;
            const nextView = new PieceView(next);
            nextView.scene = this.scene;
            nextView.create();

            this.next.piece = nextView;
        });
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
