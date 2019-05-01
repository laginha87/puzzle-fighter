import { BlockFactory } from '~src/factories';
import { BaseLogic, BlockLogic, BoardLogic } from '~src/logic';

export class PlayerLogic implements BaseLogic {
    private blockFactory : BlockFactory;
    private next : BlockLogic[];

    constructor(public board: BoardLogic) {
        this.blockFactory = new BlockFactory();
    }

    public init() {

    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

}
