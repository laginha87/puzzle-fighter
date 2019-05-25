import { EnergyType, BlockLogic } from 'src/logic';
import { Spell } from 'src/logic/spells';

export class SwitchColors extends Spell {
    cost: EnergyType[] = ['nature'];

    private time = 0;
    private effects: Effect[] = [];

    public cast() {

        const numberOfBlocks = this.level * 2;

        const blocks = Object.values(this.owner.board.blocks);

        while (this.effects.length < numberOfBlocks || blocks.length !== 0) {
            const i = Math.floor(Math.random() * blocks.length);
            const block = blocks[i];
            blocks.splice(i, 1);
            this.effects.push({
                duration: 300,
                startTime: 200 * this.effects.length,
                block,
            });
        }
    }

    public update(time: number, delta: number): boolean {
        return true;
    }

}

interface Effect {
    startTime: number;
    duration: number;
    block: BlockLogic;
}