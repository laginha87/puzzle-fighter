import { Effect, callEffect, EffectI } from '~src/utils/Effect';

export class ParallelEffect implements EffectI {
    constructor(private effects : Effect[]) {

    }

    update(time: number, delta: number): boolean {
        this.effects = this.effects.filter((e) => callEffect(e, time, delta));

        return this.effects.length == 0;
    }
}