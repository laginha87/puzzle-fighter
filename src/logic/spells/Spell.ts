import { EnergyType, PlayerLogic } from '~src/logic';
import { Observable } from 'rxjs';

export interface MatchContext {
    adversary: PlayerLogic;
    owner: PlayerLogic;
}

export type SpellContext = MatchContext & {
    level: number;
};

export interface MetaSpell {
    new(context: SpellContext): Spell;

    spellName: string;
    cost: EnergyType[];
}

export class Spell {
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
    }

    public cast(gameTime$: Observable<number>): Observable<any> {
        throw Error('Not Implemented');
    }

}