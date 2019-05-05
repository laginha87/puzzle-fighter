import { BlockLogic } from '~/src/logic';
import { Updatable } from '~src/utils';
import { Position, Size } from '~src/types';

export class BoardLogic implements Updatable {
    private blocks: BlockLogic[][];

    constructor(public size: Size) {
        this.blocks = [];
        for (let x = 0; x < size.width; x++) {
            this.blocks[x] = [];
        }
    }

    public update(time: number, delta: number): void {
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
        const { x,y } = b.position;
        this.blocks[Math.ceil(x)][Math.ceil(y)] = b;
    }
}
