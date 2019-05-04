import { IBehavior } from '~src/logic/behavior';
import { BlockLogic, PieceLogic, BoardLogic } from '~src/logic';

type Parent = BlockLogic | PieceLogic;

export class FallingBlockBehavior implements IBehavior {
    key: string;
    parent: Parent;
    moving = true;

    constructor(private speed: number, private board: BoardLogic) {

    }

    update(time: number, delta: number): void {
        if (!this.moving) {
            return;
        }
        const { position } = this.parent;
        position.y += delta * this.speed;
        if (!this.board.canMoveTo(position, this.parent.size)) {
            position.y -= delta * this.speed;
            position.y = Math.ceil(position.y);
            this.moving = false;
        }
    }

}