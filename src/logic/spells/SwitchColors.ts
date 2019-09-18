import { EnergyType, BlockLogic } from '~src/logic';
import { Spell } from '~src/logic/spells';

export class SwitchColors extends Spell {
    static cost: EnergyType[] = ['nature'];
    static spellName = 'Switch Colors';

    private effects: Effect[] = [];

    public cast() {

        const numberOfBlocks = this.level * 2;
        const blocks = Object.values(this.owner.board.blocks);

        while (this.effects.length < numberOfBlocks && blocks.length !== 0) {
            const i = Math.floor(Math.random() * blocks.length);
            const block = blocks[i];
            blocks.splice(i, 1);
            if (block.energy_type === 'willpower') {
                continue;
            }

            this.effects.push({
                duration: 300,
                startTime: 200 * this.effects.length,
                block,
            });
        }
    }

    public update(time: number, delta: number): boolean {
        this.effects = this.effects.filter((effect: Effect) => {
            if (effect.startTime < 0) {
                if (effect.duration < 0) {
                    effect.block.energy_type = 'willpower';
                    effect.block.notifyChange();

                    return false;
                } else {
                    effect.duration -= delta;
                }
            } else {
                effect.startTime -= delta;
            }

            return true;
        });

        return this.effects.length == 0;
    }

}

interface Effect {
    startTime: number;
    duration: number;
    block: BlockLogic;
}