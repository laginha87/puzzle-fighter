import { BlockLogic, ENERGIES } from '~src/logic';
import { PieceLogic } from '~src/logic/PieceLogic';

export class BlockFactory {
    constructor() {

    }

    build(): BlockLogic {
        const energy = ENERGIES[Math.floor(Math.random() * ENERGIES.length)];

        return new BlockLogic(energy, { x: -100, y: -100 });
    }

    buildPiece(): PieceLogic {
        return new PieceLogic([this.build(), this.build()]);
    }

}