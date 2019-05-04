import { Position } from '~src/types';


export const ENERGIES = <const>[ 'chaos', 'elemental', 'nature', 'order', 'willpower'];

export type EnergyType = typeof ENERGIES[number];

export class BlockLogic {
    constructor(public energy_type: EnergyType, public position: Position) {
    }

}