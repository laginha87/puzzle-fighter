import { BlockFactory } from '~src/factories';
import { BaseLogic, BoardLogic, PieceLogic } from '~src/logic';
import { EventEmitter } from '~src/utils';

export type PLAYER_LOGIC_EVENTS = 'block_added' | 'piece_added';

export class PlayerLogic extends BaseLogic {
    private blockFactory: BlockFactory;
    public next: PieceLogic;
    public events: EventEmitter<PLAYER_LOGIC_EVENTS>;

    constructor(public board: BoardLogic) {
        super();
        this.blockFactory = new BlockFactory();
        this.events = new Phaser.Events.EventEmitter();
    }

    public start() {
        this.newPiece();
        this.newPiece();
    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

    private newPiece() {
        const piece = this.blockFactory.buildPiece();
        this.board.piece = this.next;
        this.next = piece;
        this.events.emit('piece_added', this.next);
    }
}
