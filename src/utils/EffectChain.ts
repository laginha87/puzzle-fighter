import { Effect, callEffect, EffectI } from 'src/utils/Effect';
import { debounce } from 'src/utils/debounce';
import { timedEffect } from 'src/utils/timedEffect';

export class EffectChain implements EffectI {
    constructor(private effects : Effect[]) {
    }

    update(time: number, delta: number): boolean {
        if(this.effects.length == 0) {
            return true;
        }

        const finished = callEffect(this.effects[0], time, delta);
        if(finished) {
            this.effects.shift();
        }

        return this.effects.length == 0;
    }

    debounce(callback : () => void, wait : number) {
        this.effects.push(debounce(callback, wait));

        return this;
    }

    timedEffect(effect :  Effect, time: number) {
        this.effects.push(timedEffect(effect, time));

        return this;
    }

    push(effect : Effect) {
        this.effects.push(effect);

        return this;
    }

}