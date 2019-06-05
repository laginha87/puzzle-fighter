import { Updatable } from 'src/utils';
import * as EventEmitterType from 'eventemitter3';
import { EventEmitter } from 'eventemitter3';
import { EnergyType, PlayerLogic } from 'src/logic';

export interface MatchContext {
    adversary: PlayerLogic;
    owner: PlayerLogic;
}

export type SpellContext = MatchContext & {
    level: number;
};

export type SPELL_EVENTS = 'spell_finished';

export interface MetaSpell {
    new(context: SpellContext): Spell;

    spellName: string;
    cost: EnergyType[];
}

export class Spell implements Updatable {
    public events: EventEmitterType<SPELL_EVENTS>;
    public klass!: MetaSpell;

    protected level!: number;
    protected adversary!: PlayerLogic;
    protected owner!: PlayerLogic;

    public static cost: EnergyType[];
    public static spellName: string;

    public get name() {
        return this.klass.spellName;
    }

    constructor(context: SpellContext) {
        Object.assign(this, context);
        this.events = new EventEmitter();
    }

    public update(time: number, delta: number): boolean {
        throw Error('Not Implemented');
    }

    public cast(): void {
        throw Error('Not Implemented');
    }

}