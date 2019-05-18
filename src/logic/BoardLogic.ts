import { BlockLogic, PlayerLogic, PieceLogic } from 'src/logic';
import { BoardManager, DestroyManager, FallingBlocksManager, PieceManager } from 'src/logic/board_managers';
import { Updatable, EventEmitter } from 'src/utils';
import { Position, Size } from 'src/types';

export type BOARD_LOGIC_EVENTS =
    'set_piece'
    | 'break_piece'
    | 'init_piece'
    | 'destroy_blocks';


type BoardState =
    'piece_falling'
    | 'blocks_falling'
    | 'destroying_blocks';

export class BoardLogic implements Updatable {
    public _piece!: PieceLogic;
    public player!: PlayerLogic;
    public events: EventEmitter<BOARD_LOGIC_EVENTS>;
    public FALLING_BLOCK_SPEED = 0.04;
    public state: BoardState;


    public blocks: (BlockLogic | undefined)[][];
    private stateManagers: { [s in BoardState]: BoardManager };
    private startPoint: Position;

    constructor(public size: Size) {
        this.blocks = [];
        for (let x = 0; x < size.width; x++) {
            this.blocks[x] = [];
        }

        this.state = 'piece_falling';
        this.events = new Phaser.Events.EventEmitter();
        this.onPieceHit = this.onPieceHit.bind(this);
        this.startPoint = { x: size.width / 2, y: 0 };
        this.stateManagers = {
            destroying_blocks: new DestroyManager(this),
            blocks_falling: new FallingBlocksManager(this),
            piece_falling: new PieceManager(this)
        }
    }

    public get piece() {
        return this._piece;
    }

    public set piece(p: PieceLogic) {
        this._piece = p;
        p.position = { ...this.startPoint };
        p.events.once('on_fallen', this.onPieceHit);
    }

    public update(time: number, delta: number): void {
        this.stateManagers[this.state].update(time, delta);
        // this.player.nextPiece();
        // this.state = 'piece_falling';
    }

    public canMoveTo(position: Position) {
        const { x, y } = position;
        const { width, height } = this.size;
        if (x < 0 || x > width || y < 0 || y >= height - 1) {
            return false;
        }

        if (this.blocks[Math.ceil(x)][Math.ceil(y)]) {
            return false;
        }

        return true;
    }

    public addBlock(b: BlockLogic) {
        const { position: { x, y }, type } = b;
        this.blocks[Math.ceil(x)][Math.ceil(y)] = b;
        if (type == 'breaker') {
            this.breakers.push(b);
        }
    }

    public onPieceHit(): void {
        this.events.emit('break_piece');
    }

    public neighbours(x: number, y: number): BlockLogic[] {
        return [(this.blocks[x - 1] || [])[y], (this.blocks[x + 1] || [])[y], this.blocks[x][y + 1], this.blocks[x][y - 1]].filter((e) => e !== undefined);
    }
}
