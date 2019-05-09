import { Position, Size } from 'src/types';
import { BlockView } from 'src/view';


export const ENERGIES = <const>[ 'chaos', 'elemental', 'nature', 'order', 'willpower'];

export type EnergyType = typeof ENERGIES[number];

export class BlockLogic {
    size: Size = { width: 1, height: 1};

    constructor(public energy_type: EnergyType, public position: Position) {
    }

}