import { BoardLogic, BlockLogic } from 'src/logic';
import { Position } from 'src/types';
import { Updatable, EventEmitter } from 'src/utils';

type EVENTS = 'on_fallen';

const POSITIONS = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
];

export class PieceLogic implements Updatable {
    public position: Position;
    public events: EventEmitter<EVENTS>;
    private moving = true;
    public static FALLING_SPEED = 0.007;
    private currentPosition = 0;
    public fallingSpeed: number;

    constructor(public blocks: BlockLogic[], public board: BoardLogic) {
        this.position = { x: 0, y: 0 };
        this.events = new Phaser.Events.EventEmitter();
        this.fallingSpeed = PieceLogic.FALLING_SPEED;
    }

    update(time: number, delta: number): void {
        if (!this.moving) {
            return;
        }
        const { position } = this;
        const nextY = (position.y + delta * this.fallingSpeed);

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

    moveRight() {
        if (!this.moving) {
            return;
        }
        this.moveH(1);
    }

    moveLeft() {
        if (!this.moving) {
            return;
        }
        this.moveH(-1);
    }

    rotate() {
        if (!this.moving) {
            return;
        }
        const { position } = this;
        const nextPosition = (this.currentPosition + 1) % POSITIONS.length;
        const nextY = (position.y + POSITIONS[nextPosition].y);
        const nextX = (position.x + POSITIONS[nextPosition].x);
        const block = this.blocks[1];
        if (this.board.canMoveTo({ x: nextX, y: nextY })) {
            this.currentPosition = nextPosition;
            block.position.x = POSITIONS[nextPosition].x;
            block.position.y = POSITIONS[nextPosition].y;
        }


    }

    moveDown() {
        if (!this.moving) {
            return;
        }
        const { position } = this;
        const nextY = (position.y + 1);

        for (const { position: { x, y } } of this.blocks) {
            if (!this.board.canMoveTo({ x: x + position.x, y: y + nextY })) {
                return;
            }
        }
        position.y = nextY;
    }


    fall() {

    }

    private moveH(inc: number) {
        const { position } = this;
        const nextX = (position.x + inc);

        for (const { position: { x, y } } of this.blocks) {
            if (!this.board.canMoveTo({ x: x + nextX, y: y + position.y })) {
                return;
            }
        }
        position.x = nextX;
    }
}