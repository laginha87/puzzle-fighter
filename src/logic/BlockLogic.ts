import { BaseLogic } from '~src/logic/BaseLogic';
import { Position } from '~src/view/Types';


export const ENERGIES = <const>[ 'chaos', 'elemental', 'nature', 'order', 'willpower'];

export type EnergyType = typeof ENERGIES[number];

export class BlockLogic implements BaseLogic, Position {
    public x: number;
    public y: number;

    constructor(public energy_type: EnergyType, { x, y }: Position) {
        this.x = x;
        this.y = y;
    }

    update(time: number, delta: number): void {
        this.y += 1;
    }

}