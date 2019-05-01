import { BlockFactory } from '~src/factories';
import { BaseLogic, BlockLogic, BoardLogic, PieceLogic } from '~src/logic';

export type PLAYER_LOGIC_EVENTS = 'block_added' | 'piece_added'

export class PlayerLogic implements BaseLogic {
    private blockFactory: BlockFactory;
    public next: PieceLogic;
    public piece: PieceLogic;
    public events: EventEmitter<PLAYER_LOGIC_EVENTS>

    constructor(public board: BoardLogic) {
        this.blockFactory = new BlockFactory();
        this.events = new Phaser.Events.EventEmitter();
    }

    public start() {
        this.newPiece();
        this.piece = this.next;
        this.newPiece();
    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

    private newPiece() {
        const piece = this.blockFactory.buildPiece();
        this.piece = this.next;
        this.next = piece;
        this.events.emit('piece_added', this.next, this.piece)
    }
}
