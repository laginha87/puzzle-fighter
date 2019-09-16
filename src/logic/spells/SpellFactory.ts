import { Spell, MatchContext } from '~src/logic/spells';


export class SpellFactory {

    constructor(private context: MatchContext, private spells: (typeof Spell)[]) {

    }

    build(spellNumber: number, level: number): Spell {
        const spellClass = this.spells[spellNumber];

        return new spellClass({ level, ...this.context});
    }

}