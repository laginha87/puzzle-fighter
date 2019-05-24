import { BlockLogic, PlayerLogic, PieceLogic } from 'src/logic';
import { BoardManager, DestroyManager, FallingBlocksManager, PieceManager } from 'src/logic/board_managers';
import { Updatable, EventEmitter } from 'src/utils';
import { Position, Size } from 'src/types';

export type BOARD_LOGIC_EVENTS =
    'set_piece'
    | 'break_piece'
    | 'init_piece'
    | 'land_block' // Triggered when a block lands
    | 'loosen_blocks' // Triggered when a landed block starts falling
    | 'destroy_blocks';


export type BoardManagerName =
    'piece'
    | 'falling'
    | 'destroy'
    | 'spells';

export class BoardLogic implements Updatable {
    public _piece!: PieceLogic;
    public player!: PlayerLogic;
    public events: EventEmitter<BOARD_LOGIC_EVENTS>;
    public FALLING_BLOCK_SPEED = 0.01;
    public activeManager: BoardManagerName;


    public blocks: (BlockLogic | undefined)[][];
    private managers: { [s in BoardManagerName]: BoardManager };
    private startPoint: Position;

    constructor(public size: Size) {
        this.blocks = [];
        for (let x = 0; x < size.width; x++) {
            this.blocks[x] = [];
        }

        this.activeManager = 'piece';
        this.events = new Phaser.Events.EventEmitter();
        this.onPieceHit = this.onPieceHit.bind(this);
        this.startPoint = { x: size.width / 2, y: 0 };
        this.managers = {
            destroy: new DestroyManager(this),
            falling: new FallingBlocksManager(this),
            piece: new PieceManager(this),
            spells: new PieceManager(this)
        };
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
        this.managers[this.activeManager].update(time, delta);
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
        this.events.emit('land_block', b);
    }

    public loosenBlocks(bs: BlockLogic[]) {
        bs.forEach(({ position: { x, y } }) => {
            this.blocks[x][y] = undefined;
        });
        this.events.emit('loosen_blocks', bs);

    }

    public destroyBlocks(bs: BlockLogic[]) {
        bs.forEach(({ position: { x, y } }) => {
            this.blocks[x][y] = undefined;
        });
        this.events.emit('destroy_blocks', bs);
    }

    public onPieceHit(): void {
        this.events.emit('break_piece', this.piece);
    }

    public neighbours(x: number, y: number): BlockLogic[] {
        return [(this.blocks[x - 1] || [])[y], (this.blocks[x + 1] || [])[y], this.blocks[x][y + 1], this.blocks[x][y - 1]].filter((e) => e !== undefined);
    }

    public castSpell(i : number) {
        console.log(`Cast Spell ${i}`);
    }
}