import { BoardLogic, BlockLogic } from '~src/logic';
import { HasBehaviors, Behavior } from '~src/logic/behavior';
import { Position, Size } from '~src/types';
import { Updatable } from '~src/utils';

export class PieceLogic implements Updatable, HasBehaviors {
    public board: BoardLogic;
    public position : Position;
    public size : Size;
    public behavior: Behavior;

    constructor(public blocks : BlockLogic[]) {
        this.position = { x: 0, y: 0 };
        this.size = { width: 1, height: 2};
        this.behavior = new Behavior(this);
    }

    update(time: number, delta: number): void {
        this.behavior.update(time, delta);
    }
}