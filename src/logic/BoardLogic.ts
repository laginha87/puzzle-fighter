import { BlockLogic, PlayerLogic, PieceLogic, BlockId } from '~src/logic';
import { DestroyManager, FallingBlocksManager, PieceManager, SpellManager, EffectManager } from '~src/logic/board_managers';
import { Updatable } from '~src/utils';
import eventemitter3  from 'eventemitter3';

import { Position, Size } from '~src/types';
import { Spell } from '~src/logic/spells';
import { Observable } from 'rxjs';
import { BoardView } from '~src/view';

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
    | 'after_drop_effects';

type StateToManagerMap = {
    [k in BoardState]: BoardManagerName
};

type StateMachine = {
    [k in BoardState]: BoardState | (() => BoardState)
};

const STATE_TO_MANAGER_MAP: StateToManagerMap = {
    'blocks_falling': 'falling',
    'destroy_blocks': 'destroy',
    'piece_falling': 'piece',
    'after_drop_effects': 'effects',
};
interface BoardManagers {
    piece: PieceManager;
    falling: FallingBlocksManager;
    destroy: DestroyManager;
    spells: SpellManager;
    effects: EffectManager;
}

export class BoardLogic implements Updatable {
    public _piece!: PieceLogic;
    public player!: PlayerLogic;
    public events: eventemitter3<BOARD_LOGIC_EVENTS>;
    public FALLING_BLOCK_SPEED = 0.01;
    public grid: (BlockLogic | undefined)[][];
    public blocks: { [k in BlockId]: BlockLogic };
    public managers: BoardManagers;
    public view!: BoardView;


    private activeManager: BoardManagerName;
    private state: BoardState;
    private stateMachine: StateMachine;
    private startPoint: Position;

    constructor(public size: Size) {
        this.grid = [];
        for (let x = 0; x < size.width; x++) {
            this.grid[x] = [];
        }

        this.blocks = {};

        this.state = 'piece_falling';
        this.activeManager = STATE_TO_MANAGER_MAP[this.state];

        this.events = new eventemitter3();
        this.onPieceHit = this.onPieceHit.bind(this);
        this.startPoint = { x: size.width / 2, y: -2 };
        this.managers = {
            destroy: new DestroyManager(this),
            falling: new FallingBlocksManager(this),
            piece: new PieceManager(this),
            spells: new SpellManager(this),
            effects: new EffectManager(this)
        };

        this.stateMachine = {
            'blocks_falling': 'destroy_blocks',
            'piece_falling': 'blocks_falling',
            'destroy_blocks': () => {
                if (this.managers.falling.isActive) {
                    return 'blocks_falling';
                } else if(this.managers.effects.hasEffects()) {
                    this.managers.effects.activate();

                    return 'after_drop_effects';
                } else {
                    this.player.nextPiece();

                    return 'piece_falling';
                }
            },
            'after_drop_effects': () => {
                this.managers.falling.checkForFallingBlocks();

                return 'blocks_falling';
            }
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
        if (shouldChange) {
            this.transition();
        }
    }

    public canMoveTo(position: Position) {
        const { x, y } = position;
        const { width, height } = this.size;

        return !(x < 0 || x > width - 1 || y > height - 1 || this.grid[Math.ceil(x)][Math.ceil(y)]);
    }

    public addBlock(b: BlockLogic) {
        let { position: { x, y }, type } = b;
        x = Math.ceil(x);
        y = Math.ceil(y);
        Object.assign(b.position, {x, y});
        this.grid[x][y] = b;
        this.blocks[b.id] = b;
        this.events.emit('land_block', b);
    }

    public loosenBlocks(bs: BlockLogic[]) {
        bs.forEach(({ position: { x, y }, id }) => {
            this.grid[x][y] = undefined;
        });

        this.events.emit('loosen_blocks', bs);
    }

    public destroyBlocks(bs: BlockLogic[]) {
        this.events.emit('destroy_blocks', bs);

        bs.forEach(({ position: { x, y }, id}) => {
            this.grid[x][y] = undefined;
            delete this.blocks[id];
        });

        this.managers.falling.checkForFallingBlocks();

    }

    public onPieceHit(): void {
        this.events.emit('break_piece', this.piece);
        this.managers.falling.breakPiece(this.piece);
    }

    public neighbors(x: number, y: number): BlockLogic[] {
        return <BlockLogic[]>[(this.grid[x - 1] || [])[y], (this.grid[x + 1] || [])[y], this.grid[x][y + 1], this.grid[x][y - 1]].filter((e) => e !== undefined);
    }

    public transition() {
        const nextState = this.stateMachine[this.state];
        if (nextState instanceof Function) {
            this.state = nextState();
        } else {
            this.state = nextState;
        }

        this.activeManager = STATE_TO_MANAGER_MAP[this.state];
    }

    public castSpell(s : Spell) {
        const chain = this.managers.spells.findChain(s.klass.cost);
        if(chain) {
            this.managers.destroy.energyBlocks.push(...Array.from(chain, (e) => this.blocks[e]));
        }

        this.managers.effects.enqueue(s.cast.bind(s));
    }

    public enqueueEffect(effect : (game$ : Observable<number>) => Observable<null>) {
        this.managers.effects.enqueue(effect);
    }
}