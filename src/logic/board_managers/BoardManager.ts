import { Updatable } from 'src/utils';
import { BoardLogic } from 'src/logic';

export abstract class BoardManager implements Updatable {
    constructor(protected board: BoardLogic) {
    }
    abstract update(time: number, delta: number): boolean;

}