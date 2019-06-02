import { BlockFactory } from 'src/factories/BlockFactory';
import { BoardLogic, PieceLogic, EnergyPoolLogic } from 'src/logic';
import { Updatable } from 'src/utils';
import * as EventEmitterType from 'eventemitter3';
import { EventEmitter } from 'eventemitter3';
import { PlayerController } from 'src/controllers';

export type PLAYER_LOGIC_EVENTS = 'set_next' | 'cast_spell';

export class PlayerLogic implements Updatable {
    public blockFactory: BlockFactory;
    public events: EventEmitterType<PLAYER_LOGIC_EVENTS>;
    public next!: PieceLogic;
    public _piece!: PieceLogic;
    public _controller!: PlayerController;
    private energyPool : EnergyPoolLogic;

    constructor(public board: BoardLogic) {
        this.blockFactory = new BlockFactory();
        this.energyPool = new EnergyPoolLogic(this);
        this.events = new EventEmitter();
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
        _controller.onMoveRight(() => board.piece.moveRight());
        _controller.onMoveLeft(() => board.piece.moveLeft());
        _controller.onMoveDown(() => board.piece.moveDown());
        _controller.onFall(() => board.piece.fall());
        _controller.onRotate(() => board.piece.rotate());
        _controller.onSpell((i) => board.castSpell(i));
    }

    public nextPiece() {
        this.board.piece = this.next;
        this.board.events.emit('set_piece');
        this.next = new PieceLogic(this.blockFactory.buildPiece(), this.board);
        this.events.emit('set_next');
    }

}
