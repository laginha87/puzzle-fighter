import { BaseLogic, BlockLogic } from '~src/logic';

export class PieceLogic implements BaseLogic {

    constructor(public blocks: BlockLogic[]) {

    }

    update(time: number, delta: number): void {
    }
}