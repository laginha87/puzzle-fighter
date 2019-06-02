import { Updatable, EventEmitter } from 'src/utils';
import { EnergyType, PlayerLogic } from 'src/logic';

export interface MatchContext {
    adversary: PlayerLogic;
    owner: PlayerLogic;
}

export type SpellContext = MatchContext & {
    level: number;
};

export type SPELL_EVENTS = 'spell_finished';

export class Spell implements Updatable {
    public cost!: EnergyType[];
    public events: EventEmitter<SPELL_EVENTS>;
    protected level!: number;
    protected adversary!: PlayerLogic;
    protected owner!: PlayerLogic;

    public name! : string;

    constructor(context: SpellContext) {
        Object.assign(this, context);
        this.events = new Phaser.Events.EventEmitter();
    }

    public update(time: number, delta: number): boolean {
        throw Error('Not Implemented');
    }

    public cast(): void {
        throw Error('Not Implemented');
    }

}