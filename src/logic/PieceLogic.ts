import { BoardLogic } from '~src/logic';
import { HasBehaviors, Behavior } from '~src/logic/behavior';
import { Position, Size } from '~src/types';
import { Updatable } from '~src/utils';
import { BlockLogic } from './BlockLogic';

export class PieceLogic implements Updatable, HasBehaviors<PieceLogic> {
    public board: BoardLogic;
    public position : Position;
    public size : Size;
    public behavior: Behavior<PieceLogic>;

    constructor(public blocks : BlockLogic[]) {
        this.position = { x: 0, y: 0 };
        this.behavior = new Behavior();
    }

    update(time: number, delta: number): void {
        this.behavior.update(time, delta);
    }
}