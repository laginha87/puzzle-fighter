import { Position, Size } from 'src/types';
import { BlockView } from 'src/view';


export const ENERGIES = <const>['chaos', 'elemental', 'nature', 'order', 'willpower'];
export type Type = 'regular' | 'breaker';
export type EnergyType = typeof ENERGIES[number];

export class BlockLogic {
    size: Size = { width: 1, height: 1 };
    view?: BlockView;

    constructor(public energy_type: EnergyType, public position: Position, public type : Type, public id: number) {
    }

}