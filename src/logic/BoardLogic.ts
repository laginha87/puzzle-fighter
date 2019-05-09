import { BlockLogic, PlayerLogic, PieceLogic } from 'src/logic';
import { Updatable, EventEmitter } from 'src/utils';
import { Position, Size } from 'src/types';

export type BOARD_LOGIC_EVENTS = 'set_piece' | 'break_piece';

export class BoardLogic implements Updatable {
    public _piece: PieceLogic;
    public player: PlayerLogic;
    public events: EventEmitter<BOARD_LOGIC_EVENTS>;

    private fallingBlocks: BlockLogic[] = [];

    private blocks: BlockLogic[][];
    private state: 'piece_falling' | 'blocks_falling';
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
    }

    public get piece() {
        return this._piece;
    }

    public set piece(p: PieceLogic) {
        this._piece = p;
        p.position = { ...this.startPoint };
        this.events.emit('set_piece');
        p.events.once('on_fallen', this.onPieceHit);
    }

    public update(time: number, delta: number): void {
        switch (this.state) {
            case 'piece_falling':
                return this.piece.update(time, delta);
            case 'blocks_falling':
                this.fallingBlocks = this.fallingBlocks.filter((block) => {
                    const { position } = block;
                    const y = (position.y + delta * 0.04);
                    if (!this.canMoveTo({ x: position.x, y })) {
                        position.y = Math.ceil(position.y);
                        this.addBlock(block);

                        return false;
                    }
                    position.y = y;

                    return true;
                });
                if (this.fallingBlocks.length == 0) {
                    this.player.nextPiece();
                    this.state = 'piece_falling';
                }

                return;

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
        const { x, y } = b.position;
        this.blocks[Math.ceil(x)][Math.ceil(y)] = b;
    }

    public onPieceHit(): void {
        this.fallingBlocks.push(...this.piece.blocks);
        this.fallingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);
        this.state = 'blocks_falling';
        this.events.emit('break_piece');
        // this.piece = this.next;
        // this.board.piece = this.next;
        // this.next = new PieceLogic(this.blockFactory.buildN(2), this.board);
        // this.piece.events.once('on_fallen', this.onPieceHit);
        // this.events.emit('set_piece');
    }
}
