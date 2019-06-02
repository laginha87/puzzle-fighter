import { Position, Size } from 'src/types';
import { BlockView } from 'src/view/BlockView';


export const ENERGIES = ['chaos', 'elemental', 'nature', 'order', 'willpower'];
export type Type = 'regular' | 'breaker' | 'energy';
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