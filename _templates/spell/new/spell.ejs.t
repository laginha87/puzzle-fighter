---
to: src/logic/spells/<%= h.changeCase.pascal(name)%>.ts
---
import { EnergyType } from 'src/logic';
import { Spell } from 'src/logic/spells';

export class Pull extends Spell {
    static cost: EnergyType[] = [''];
    static spellName = '<%= h.changeCase.sentence(name)%>';

    public cast() {
    }

    public update(time: number, delta: number): boolean {
        return true;
    }

}