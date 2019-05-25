import { Spell } from 'src/logic/spells';
import { EnergyType, PlayerLogic } from 'src/logic';

export class SwitchColors extends Spell {
    cost: EnergyType[] = ['nature'];

    public cast(p: PlayerLogic): boolean {
        return true;
    }
}