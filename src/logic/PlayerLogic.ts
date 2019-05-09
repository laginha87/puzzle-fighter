import { BlockFactory } from 'src/factories';
import { BoardLogic, PieceLogic } from 'src/logic';
import { EventEmitter, Updatable } from 'src/utils';
import { PlayerController } from 'src/controllers';

export type PLAYER_LOGIC_EVENTS = 'set_next';

export class PlayerLogic implements Updatable {
    private blockFactory: BlockFactory;
    public next: PieceLogic;
    public events: EventEmitter<PLAYER_LOGIC_EVENTS>;
    public _piece: PieceLogic;
    public _controller: PlayerController;

    constructor(public board: BoardLogic) {
        this.blockFactory = new BlockFactory();
        this.events = new Phaser.Events.EventEmitter();
    }

    public start() {
        this.board.piece = new PieceLogic(this.blockFactory.buildN(2), this.board);
        this.next = new PieceLogic(this.blockFactory.buildN(2), this.board);

        this.events.emit('set_next');
    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

    public set controller(_controller: PlayerController) {
        this._controller = _controller;
        const { board } = this;
        _controller.onMoveRight(() => board.piece.moveRight());
        _controller.onMoveLeft(() => board.piece.moveLeft());
        _controller.onMoveDown(() => board.piece.moveDown());
        _controller.onFall(() => board.piece.fall());
        _controller.onRotate(() => board.piece.rotate());
    }

    public nextPiece() {
        this.board.piece = this.next;
        this.next = new PieceLogic(this.blockFactory.buildN(2), this.board);
        this.events.emit('set_next');
    }
    // private newPiece() {
    //     const piece = board.blockFactory.buildPiece();
    //     this.board.piece = this.next;
    //     this.next = piece;
    //     this.events.emit('piece_added', this.next);
    // }
}
