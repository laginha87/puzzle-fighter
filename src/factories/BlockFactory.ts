import { BlockLogic, ENERGIES, Type as BlockType } from 'src/logic';

export class BlockFactory {
    constructor() {

    }

    build(): BlockLogic {
        const energy = ENERGIES[Math.floor(Math.random() * ENERGIES.length)];
        const type: BlockType = Math.random() > 0.9 ? 'regular' : 'breaker';

        return new BlockLogic(energy, { x: 0, y: 0 }, type);
    }

    buildN(n: number): BlockLogic[] {
        const acc = [];
        for (let i = 0; i < n; i++) {
            acc.push(this.build());
        }

        return acc;
    }

}