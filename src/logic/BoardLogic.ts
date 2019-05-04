import { PieceLogic } from '~/src/logic';
import { Updatable } from '~src/utils';
import { Position, Size } from '~src/types';

export class BoardLogic implements Updatable {

    constructor(public size : Size) {

    }

    public update(time: number, delta: number): void {
    }

    public canMoveTo(position : Position, size : Size) {
        const { x, y } = position;
        const { width, height } = this.size;
        if (x < 0 || x > width || y < 0 || y + size.height >= height) {
            return false;
        }

        return true;
    }
}
