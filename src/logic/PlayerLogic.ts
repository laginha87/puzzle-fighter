import { BlockFactory } from '~src/factories';
import { BoardLogic, PieceLogic } from '~src/logic';
import { EventEmitter, Updatable } from '~src/utils';

export type PLAYER_LOGIC_EVENTS = 'set_piece' | 'set_next' | 'break_piece';

export class PlayerLogic implements Updatable {
    private blockFactory: BlockFactory;
    public next: PieceLogic;
    public events: EventEmitter<PLAYER_LOGIC_EVENTS>;
    public piece: PieceLogic;

    constructor(public board: BoardLogic) {
        this.blockFactory = new BlockFactory();
        this.events = new Phaser.Events.EventEmitter();
        this.onPieceHit = this.onPieceHit.bind(this);
    }

    public start() {
        this.piece = new PieceLogic(this.blockFactory.buildN(2), this.board);
        this.next = new PieceLogic(this.blockFactory.buildN(2), this.board);
        this.piece.events.once('on_fallen', this.onPieceHit);


        this.events.emit('set_piece');
        this.events.emit('set_next');
    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
        this.piece.update(time, delta);
    }

    public onPieceHit(): void {
        this.piece.blocks.forEach((b) => this.board.addBlock(b));
        this.events.emit('break_piece');
        this.piece = this.next;
        this.next = new PieceLogic(this.blockFactory.buildN(2), this.board);
        this.piece.events.once('on_fallen', this.onPieceHit);
        this.events.emit('set_piece');
        this.events.emit('set_next');

    }
    // private newPiece() {
    //     const piece = this.blockFactory.buildPiece();
    //     this.board.piece = this.next;
    //     this.next = piece;
    //     this.events.emit('piece_added', this.next);
    // }
}
