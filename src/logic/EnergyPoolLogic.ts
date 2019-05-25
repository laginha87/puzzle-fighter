import { PlayerLogic, EnergyType, ENERGIES, BlockLogic } from 'src/logic';
import { BlockFactory } from 'src/factories';


type Pool = { [k in EnergyType]: number };

export class EnergyPoolLogic {
    blockFactory: BlockFactory;
    pool: Pool;

    constructor(private player: PlayerLogic) {
        player.board.events.on('destroy_blocks', this.onBlocksDestroyed.bind(this));
        this.blockFactory = player.blockFactory;
        this.pool = ENERGIES.reduce((acc : Pool, energy : EnergyType) => ({ ...acc, [energy]: 0 }), <Pool>{});
    }

    onBlocksDestroyed(blocks: BlockLogic[]) {
        blocks.forEach(({ energy_type, type }) => {
            if (type != 'regular') {
                return;
            }
            this.pool[energy_type] += 0.25;
        });

        ENERGIES.forEach((e : EnergyType) => {
            const val = this.pool[e];
            if (val < 1) {
                return;
            }

            const diff = Math.floor(val);
            this.pool[e] = val - diff;
            this.blockFactory.energyPool.push(
                ...Array(diff)
                .fill(e));
        });

    }
}