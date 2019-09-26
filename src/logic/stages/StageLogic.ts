import { Updatable } from '~src/utils';
import { MatchLogic } from '~src/logic';

export abstract class StageLogic implements Updatable {
    constructor(protected match : MatchLogic) {

    }

    abstract start(): void;
    abstract update(time: number, delta: number): void;

}