export interface EffectI {
    update(time : number, delta : number) : boolean;
}

type EffectFn = (time : number, delta : number) => boolean;

export type Effect = EffectI | EffectFn;

export function isEffectFn(effect : Effect): effect is EffectFn {
    return (<EffectI>effect).update === undefined;
}

export function callEffect(effect: Effect, time : number, delta: number) : boolean {
    return isEffectFn(effect) ? effect(time, delta) : effect.update(time, delta);
}