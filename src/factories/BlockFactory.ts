import { BlockLogic, ENERGIES, Type as BlockType } from 'src/logic';

export class BlockFactory {
    private id = 0;

    build(): BlockLogic {
        const energy = ENERGIES[Math.floor(Math.random() * ENERGIES.length)];
        const type: BlockType = Math.random() > 0.5 ? 'breaker' : 'regular';

        return new BlockLogic(energy, { x: 0, y: 0 }, type, this.id++);
    }

    buildN(n: number): BlockLogic[] {
        const acc = [];
        for (let i = 0; i < n; i++) {
            acc.push(this.build());
        }

        return acc;
    }

}