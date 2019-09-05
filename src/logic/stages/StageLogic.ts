import { Updatable } from 'src/utils';
import { MatchLogic } from 'src/logic';

export abstract class StageLogic implements Updatable {
    constructor(private match : MatchLogic) {

    }
    abstract update(time: number, delta: number): void;

}