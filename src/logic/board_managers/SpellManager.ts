import { BoardManager } from 'src/logic/board_managers';
import { BlockLogic, BoardLogic, BlockId } from 'src/logic';
import { Spell } from 'src/logic/spells';

export type EnergyChain = Set<BlockId>;

export class SpellManager extends BoardManager {
    private energyChains: Set<EnergyChain> = new Set();
    private blockIdByChains: { [k in BlockId]: EnergyChain } = {};

    constructor(board: BoardLogic) {
        super(board);
        board.events.on('land_block', (b: BlockLogic) => {
            if (b.type !== 'energy') {
                return;
            }

            this.addBlock(b);
        });
        board.events.on('destroy_blocks', this.removeBlocks.bind(this));
        board.events.on('loosen_blocks', this.removeBlocks.bind(this));
    }

    cast(s : Spell) {
        alert(`Casting Spell ${s}`);
    }

    update(time: number, delta: number): boolean {
        return true;
    }

    private addBlock(b: BlockLogic) {
        const neighbors = this.board
            .neighbors(b.position.x, b.position.y)
            .filter((e: BlockLogic) => e.type === 'energy' && b.energy_type === e.energy_type)
            .map(({ id }) => id);

        if (neighbors.length === 0) {
            this.blockIdByChains[b.id] = new Set([b.id]);
            this.energyChains.add(this.blockIdByChains[b.id]);

            return;
        }

        const oldChains = neighbors.map((e) => this.blockIdByChains[e]);
        oldChains.forEach((e) => this.energyChains.delete(e));

        const newChain = new Set(neighbors);
        newChain.add(b.id);

        newChain.forEach((e) => this.blockIdByChains[e] = newChain);
        this.energyChains.add(newChain);
    }

    private removeBlocks(bs: BlockLogic[]) {
        const chainsToClean = new Set<EnergyChain>();

        bs.forEach((e) => {
            if (e.type !== 'energy') {
                return;
            }
            const chain = this.blockIdByChains[e.id];
            chain.delete(e.id);
            chainsToClean.add(chain);
            delete this.blockIdByChains[e.id];
        });

        chainsToClean.forEach((e) => this.energyChains.delete(e));

        chainsToClean.forEach((chain) => {
            if (chain.size === 0) {
                return;
            }

            chain.forEach((id) => {
                this.addBlock(this.board.blocks[id]);
            });

        });

    }
}