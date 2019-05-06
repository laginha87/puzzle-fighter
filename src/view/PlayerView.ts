import { PlayerLogic, PieceLogic } from '~src/logic';
import { BoardView, SceneState, PieceView } from '~src/view';
import { LayoutConfig } from '~src/view/Types';
import { Position } from '~src/types';
import { PlayerController } from '~src/controllers/PlayerController';

export class PlayerView implements SceneState {
    public scene!: Phaser.Scene;
    public nextContainer: Phaser.GameObjects.Container;
    public next: PieceView;
    public piece: PieceView;

    constructor(public logic: PlayerLogic, public board: BoardView, private layout: LayoutConfig & { next: Position }) {

        // this.logic.events.on('next_changed', (next : PieceLogic) => {
        //     this.piece = this.next;
        //     this.board.container.add(this.piece.container);
        //     this.next = new PieceView(next, this.layout);
        //     this.next.view
        //     this.next.create();
        //     this.nextContainer.add(this.next.container);
        // });

        this.logic.events.on('set_piece', () => {
            this.piece = new PieceView(this.logic.piece, this.layout);
            this.piece.scene = this.scene;
            this.piece.create();
            this.board.container.add(this.piece.container);
        });


        this.logic.events.on('set_next', () => {
            this.next = new PieceView(this.logic.next, this.layout);
            this.next.scene = this.scene;
            this.next.create();
            this.nextContainer.add(this.next.container);
        });

        this.logic.events.on('break_piece', () => {
            this.piece.blocks.forEach(e => {
                this.board.container.add(e.sprite);
                e.update(0, 0);
            });
            this.piece.container.destroy();
            delete this.piece;
        });
    }

    public init() {
    }

    public preload() {
        this.board.preload();
    }

    public create() {
        this.board.create();
        this.nextContainer = this.scene.add.container(this.layout.next.x, this.layout.next.y);
    }

    update(time: number, delta: number) {
        this.board.update(time, delta);
        this.piece.update(time, delta);
    }
}
