import { IBehavior } from '~src/logic/behavior';
import { BlockLogic, PieceLogic, BoardLogic } from '~src/logic';

export class FallingBlockBehavior implements IBehavior<any> {
    key: string;
    parent: BlockLogic | PieceLogic;

    constructor(private speed : number, private board : BoardLogic) {

    }

    update(time: number, delta: number): void {
        const {position} = this.parent;
        position.y += delta * this.speed;
        if(this.board.canMoveTo(position)){

        }
    }

}