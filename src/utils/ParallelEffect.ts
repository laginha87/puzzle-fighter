import { Effect } from 'src/utils/Effect';

export class ParallelEffect implements Effect {
    constructor(private effects : Effect[]) {

    }

    update(time: number, delta: number): boolean {
        this.effects = this.effects.filter((e) => e.update(time, delta));

        return this.effects.length == 0;
    }
}