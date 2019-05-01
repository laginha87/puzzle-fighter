import { BlockFactory } from '~src/factories';
import { BaseLogic, BlockLogic, BoardLogic } from '~src/logic';

export type PLAYER_LOGIC_EVENTS = 'block_added' | 'piece_added'

export class PlayerLogic implements BaseLogic {
    private blockFactory: BlockFactory;
    public next: BlockLogic[];
    public events: EventEmitter<PLAYER_LOGIC_EVENTS>

    constructor(public board: BoardLogic) {
        this.blockFactory = new BlockFactory();
        this.events = new Phaser.Events.EventEmitter();
    }

    public init() {
        this.newPiece()
    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

    private newPiece() {
        this.next = [this.newBlock(), this.newBlock()]
        this.events.emit('piece_added')
    }

    private newBlock(): BlockLogic {
        const block = this.blockFactory.build()
        this.events.emit('block_added', block)

        return block
    }
}
