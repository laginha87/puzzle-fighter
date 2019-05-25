import { Spell } from 'src/logic/spells';
import { EnergyType, PlayerLogic } from 'src/logic';
import { BlockLogic } from '../BlockLogic';

export class SwitchColors extends Spell {
    cost: EnergyType[] = ['nature'];

    private numberOfBlocks: number;

    private time = 0;
    private effects: Effect[] = [];

    public constructor(args: { level: number, player: PlayerLogic }) {
        super(args);

        this.numberOfBlocks = 4;
    }

    public cast() {
        const blocks = Object.values(this.player.board.blocks);

        while (this.effects.length < this.numberOfBlocks || blocks.length !== 0) {
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