import { BlockLogic, ENERGIES } from '~src/logic';

export class BlockFactory {
    constructor() {

    }

    build(): BlockLogic {
        const energy = ENERGIES[Math.floor(Math.random() * ENERGIES.length)];

        return new BlockLogic(energy, { x: 0, y: 10 });
    }

}