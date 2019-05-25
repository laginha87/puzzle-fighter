import { Updatable } from 'src/utils';
import { EnergyType, PlayerLogic } from 'src/logic';

export interface MatchContext {
    adversary: PlayerLogic;
    owner: PlayerLogic;
}

export type SpellContext = MatchContext & {
    level: number;
};


export class Spell implements Updatable {
    public cost!: EnergyType[];
    protected level!: number;
    protected adversary!: PlayerLogic;
    protected owner!: PlayerLogic;

    constructor(context: SpellContext) {
        Object.assign(this, context);
    }

    public update(time: number, delta: number): boolean {
        throw Error('Not Implemented');
    }

    public cast(): void {
        throw Error('Not Implemented');
    }

}