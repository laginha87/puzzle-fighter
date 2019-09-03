import { Updatable } from 'src/utils';
import { MatchLogic } from 'src/logic/MatchLogic';
import { Stage } from 'src/logic/stages';

export class StageLogic implements Updatable{
    constructor(private match : MatchLogic, private stage : Stage) {

    }

    update(time: number, delta: number): void {

    }
}