import { Position, Size } from '~src/types';
import { BlockView } from '~src/view/BlockView';

// @ts-ignore
export const ENERGIES = <const>['chaos', 'elemental', 'nature', 'order', 'willpower'];
// @ts-ignore
export const BLOCK_TYPES = <const>['regular', 'breaker', 'energy'];
export type Type = typeof BLOCK_TYPES[number];
export type EnergyType = typeof ENERGIES[number];
export type BlockId = number;

export class BlockLogic {
    size: Size = { width: 1, height: 1 };
    view?: BlockView;

    constructor(public energy_type: EnergyType, public position: Position, public type : Type, public id: BlockId) {
    }

    notifyChange(){
        if(this.view) {
            this.view.refreshAll();
        }
    }

}