import { BlockLogic, ENERGIES } from '~src/logic';

export class BlockFactory {
    constructor() {

    }

    build(): BlockLogic {
        const energy = ENERGIES[Math.floor(Math.random() * ENERGIES.length)];

        return new BlockLogic(energy, { x: 0, y: 0 });
    }

    buildN(n: number): BlockLogic[] {
        const acc = [];
        for (let i = 0; i < n; i++) {
            acc.push(this.build());
        }

        return acc;
    }

}