import { BlockLogic, ENERGIES, Type as BlockType, EnergyType } from '~src/logic';

export class BlockFactory {
    private id = 0;
    public energyPool : EnergyType[] = [];

    build(energy : EnergyType | null = null, type : BlockType | null = null ): BlockLogic {
        if(!energy) {
            energy = ENERGIES[Math.floor(Math.random() * ENERGIES.length)];
        }
        if(!type) {
            type = Math.random() > 0.8 ? 'breaker' : 'regular';
        }

        return new BlockLogic(energy, { x: 0, y: 0 }, type, this.id++);
    }

    buildN(n: number, energy : EnergyType | null = null, type : BlockType | null = null): BlockLogic[] {
        const acc = [];
        for (let i = 0; i < n; i++) {
            acc.push(<never>this.build(energy, type));
        }

        return acc;
    }

    buildPiece(): BlockLogic[] {
        const blocks = this.buildN(2);
        if(this.energyPool.length > 0) {
            const block = blocks[Math.floor(Math.random() * 2)];
            block.energy_type = this.energyPool.pop()!;
            block.type = 'energy';
        }

        return blocks;
    }

}