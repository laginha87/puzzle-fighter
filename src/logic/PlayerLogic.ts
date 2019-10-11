import { BlockFactory } from '~src/factories/BlockFactory';
import { BoardLogic, PieceLogic, EnergyPoolLogic } from '~src/logic';
import { Updatable } from '~src/utils';
import eventemitter3 from 'eventemitter3';
import { PlayerController } from '~src/controllers';
import { MetaSpell } from '~src/logic/spells';

export type PLAYER_LOGIC_EVENTS =
    'set_next'
    | 'action:move_right'
    | 'action:move_left'
    | 'action:move_down'
    | 'action:fall'
    | 'action:rotate'
    | 'action:spell'
    | 'spell:not_enough_energy'
    | 'spell:cast'
    | 'spell:finished';

export type PlayerType = 'ai' | 'player';

export interface PlayerLogicConfig {
    spells: MetaSpell[];
    board : BoardLogic;
    type: PlayerType;
}

export class PlayerLogic implements Updatable {
    public blockFactory: BlockFactory;
    public events: eventemitter3<PLAYER_LOGIC_EVENTS>;
    public next!: PieceLogic;
    public _piece!: PieceLogic;
    public _controller!: PlayerController;
    public spells : MetaSpell[];
    public board: BoardLogic;
    public type: PlayerType;
    private energyPool: EnergyPoolLogic;

    constructor(playerConfig: PlayerLogicConfig) {
        this.board = playerConfig.board;
        this.type = playerConfig.type;
        this.blockFactory = new BlockFactory();
        this.energyPool = new EnergyPoolLogic(this);
        this.events = new eventemitter3();
        this.spells = playerConfig.spells;
    }

    public start() {
        this.board.piece = new PieceLogic(this.blockFactory.buildPiece(), this.board);
        this.board.events.emit('init_piece');

        this.next = new PieceLogic(this.blockFactory.buildPiece(), this.board);

        this.events.emit('set_next');
    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

    public set controller(_controller: PlayerController) {
        this._controller = _controller;
        const { board } = this;
        _controller.onMoveRight(() => {
            board.piece.moveRight();
            this.events.emit('action:move_right');
        });
        _controller.onMoveLeft(() => {
            board.piece.moveLeft();
            this.events.emit('action:move_left');
        });
        _controller.onMoveDown(() => {
            board.piece.moveDown();
            this.events.emit('action:move_down');
        });
        _controller.onFall(() => {
            board.piece.fall();
            this.events.emit('action:fall');
        });
        _controller.onRotate(() => {
            board.piece.rotate();
            this.events.emit('action:rotate');
        });
        _controller.onSpell(this.castSpell.bind(this));
    }

    public nextPiece() {
        this.board.piece = this.next;
        this.board.events.emit('set_piece');
        this.next = new PieceLogic(this.blockFactory.buildPiece(), this.board);
        this.events.emit('set_next');
    }

    public castSpell(spellNumber: number) {
        const Spell = this.spells[spellNumber];

        if (!this.board.managers.spells.canCast(Spell)) {
            this.events.emit('spell:not_enough_energy');

            return;
        }
        const spell =new Spell({
            owner: this,
            adversary: this,
            level: 1
        });
        spell.klass = Spell;
        this.board.castSpell(spell);
    }

}
