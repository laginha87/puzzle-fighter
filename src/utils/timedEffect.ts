import { Effect, callEffect } from '~src/utils/Effect';

export const timedEffect = ( effect :  Effect, time: number) => {
    let total = 0;

    return (time : number, delta : number): boolean  => {
        total += delta;

        return callEffect(effect, time, delta) || total >= time;
    };
};