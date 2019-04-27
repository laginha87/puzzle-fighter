import { BaseLogic } from "src/logic/BaseLogic";
import { BoardLogic } from "src/logic/BoardLogic";

export class PlayerLogic implements BaseLogic {

    constructor(public board: BoardLogic) {

    }

    public update(time: number, delta: number): void {
        this.board.update(time, delta);
    }

}
