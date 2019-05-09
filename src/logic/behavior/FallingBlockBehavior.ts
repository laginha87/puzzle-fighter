import { IBehavior } from 'src/logic/behavior';
import { BlockLogic, PieceLogic, BoardLogic } from 'src/logic';

type Parent = BlockLogic | PieceLogic;

export class FallingBlockBehavior implements IBehavior {
    key: string;
    parent: Parent;
    moving = true;

    constructor(private speed: number, private board: BoardLogic, private callback: () => void ) {

    }

    update(time: number, delta: number): void {
        if (!this.moving) {
            return;
        }
        const { position, size: { height } } = this.parent;
        const y = (position.y + delta * this.speed) + height;
        for (let x = 0; x < this.parent.size.width; x++) {
            if(!this.board.canMoveTo({x: x + position.x, y })){
                position.y = Math.ceil(position.y);
                this.moving = false;
                this.callback();

                return;
            }
        }
        position.y = y - height;

    }

}