import { BaseLogic, BlockLogic, BoardLogic } from '~src/logic';
import { Position } from '~src/view';

export class PieceLogic extends BaseLogic implements Position {

    public x: number;
    public y: number;
    public board: BoardLogic;
    private isMoving: boolean = true;

    constructor(public blocks: BlockLogic[]) {
        super();
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        if (!this.isMoving) {
            return;
        }
        const increase = delta / 10;
        this.y += increase;
        const { x: originX, y: originY } = this;
        const canMove = this.blocks.every(({ x, y }) => this.board.canMoveTo(x + originX, y + originY));
        if(!canMove) {
            this.y -= increase;
            this.isMoving = false;
        } else {

        }
    }
}