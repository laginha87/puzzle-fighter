import { BlockFactory } from '~src/factories';
import { BoardLogic, PieceLogic, BlockLogic } from '~src/logic';
import { EventEmitter, Updatable } from '~src/utils';

export type PLAYER_LOGIC_EVENTS =  'set_piece' | 'set_next';

export class PlayerLogic implements Updatable {
    private blockFactory: BlockFactory;
    public next: PieceLogic;
    public events: EventEmitter<PLAYER_LOGIC_EVENTS>;
    public piece: PieceLogic;

    constructor(public board: BoardLogic) {
        this.blockFactory = new BlockFactory();
        this.events = new Phaser.Events.EventEmitter();
    }

    public start() {
        this.piece = new PieceLogic([this.blockFactory.build(), this.blockFactory.build()]);
        this.next =  new PieceLogic([this.blockFactory.build(), this.blockFactory.build()]);
        this.events.emit('set_piece');
        this.events.emit('set_next');
    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

    // private newPiece() {
    //     const piece = this.blockFactory.buildPiece();
    //     this.board.piece = this.next;
    //     this.next = piece;
    //     this.events.emit('piece_added', this.next);
    // }
}
