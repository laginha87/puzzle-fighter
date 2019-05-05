import { BoardLogic, BlockLogic } from '~src/logic';
import { Position } from '~src/types';
import { Updatable, EventEmitter } from '~src/utils';

type EVENTS = 'on_fallen';

export class PieceLogic implements Updatable {
    public position: Position;
    public events: EventEmitter<EVENTS>;
    private moving = true;
    private speed = 0.007;

    constructor(public blocks: BlockLogic[], private board : BoardLogic) {
        this.position = { x: 0, y: 0 };
        this.events = new Phaser.Events.EventEmitter();
    }

    update(time: number, delta: number): void {
        if (!this.moving) {
            return;
        }
        const { position } = this;
        const nextY = (position.y + delta * this.speed);

        for (const { position: { x, y } } of this.blocks) {
            if (!this.board.canMoveTo({ x: x + position.x, y: y + nextY })) {
                position.y = Math.ceil(position.y);
                this.moving = false;
                this.blocks.forEach(e => {
                    e.position.x += position.x;
                    e.position.y += position.y;
                });
                this.events.emit('on_fallen');

                return;
            }
        }

        position.y = nextY;
    }
}