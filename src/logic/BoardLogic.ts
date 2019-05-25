import { BlockLogic, PlayerLogic, PieceLogic } from 'src/logic';
import { DestroyManager, FallingBlocksManager, PieceManager } from 'src/logic/board_managers';
import { Updatable, EventEmitter } from 'src/utils';
import { Position, Size } from 'src/types';

export type BOARD_LOGIC_EVENTS =
    'set_piece'
    | 'break_piece'
    | 'init_piece'
    | 'land_block' // Triggered when a block lands
    | 'loosen_blocks' // Triggered when a landed block starts falling
    | 'destroy_blocks';


export type BoardManagerName = keyof BoardManagers;

type BoardState =
    'piece_falling'
    | 'blocks_falling'
    | 'destroy_blocks'
    | 'casting_spells';

type StateToManagerMap = {
    [k in BoardState]: BoardManagerName
};

type StateMachine = {
    [k in BoardState]: BoardState | (() => BoardState)
};

const STATE_TO_MANAGER_MAP: StateToManagerMap = {
    'blocks_falling': 'falling',
    'casting_spells': 'spells',
    'destroy_blocks': 'destroy',
    'piece_falling': 'piece'
};
interface BoardManagers {
    piece: PieceManager;
    falling: FallingBlocksManager;
    destroy: DestroyManager;
    spells: PieceManager;
}

export class BoardLogic implements Updatable {
    public _piece!: PieceLogic;
    public player!: PlayerLogic;
    public events: EventEmitter<BOARD_LOGIC_EVENTS>;
    public FALLING_BLOCK_SPEED = 0.01;
    public blocks: (BlockLogic | undefined)[][];
    public managers: BoardManagers;


    private activeManager: BoardManagerName;
    private state: BoardState;
    private stateMachine: StateMachine;
    private startPoint: Position;

    constructor(public size: Size) {
        this.blocks = [];
        for (let x = 0; x < size.width; x++) {
            this.blocks[x] = [];
        }

        this.state = 'piece_falling';
        this.activeManager = STATE_TO_MANAGER_MAP[this.state];

        this.events = new Phaser.Events.EventEmitter();
        this.onPieceHit = this.onPieceHit.bind(this);
        this.startPoint = { x: size.width / 2, y: 0 };
        this.managers = {
            destroy: new DestroyManager(this),
            falling: new FallingBlocksManager(this),
            piece: new PieceManager(this),
            spells: new PieceManager(this)
        };

        this.stateMachine = {
            'blocks_falling': 'destroy_blocks',
            'piece_falling': 'blocks_falling',
            'destroy_blocks': () => {
                if(this.managers.falling.isActive){
                    return 'blocks_falling';
                } else {
                    this.player.nextPiece();

                    return 'piece_falling';
                }
            },
            'casting_spells': 'blocks_falling'
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
        const shouldChange = this.managers[this.activeManager].update(time, delta);
        if(shouldChange) {
            this.transition();
        }
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

        this.managers.falling.destroyBlocks(bs);

        this.events.emit('destroy_blocks', bs);
    }

    public onPieceHit(): void {
        this.events.emit('break_piece', this.piece);
        this.managers.falling.breakPiece(this.piece);
    }

    public neighbours(x: number, y: number): BlockLogic[] {
        return [(this.blocks[x - 1] || [])[y], (this.blocks[x + 1] || [])[y], this.blocks[x][y + 1], this.blocks[x][y - 1]].filter((e) => e !== undefined);
    }

    public transition() {
        const nextState = this.stateMachine[this.state];
        if(nextState instanceof Function){
            this.state = nextState();
        } else {
            this.state = nextState;
        }

        this.activeManager = STATE_TO_MANAGER_MAP[this.state];
    }

    public castSpell(i: number) {
        console.log(`Cast Spell ${i}`);
    }
}