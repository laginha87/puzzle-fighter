import { BoardLogic, BlockLogic, ENERGIES, EnergyType, Type, BLOCK_TYPES } from 'src/logic';

export function serializeBoard(b: BoardLogic): string {
    const blocks : BlockLogic[]= Object.values(b.blocks);
    blocks.sort(({ position: { x: x1, y: y1 } }, { position: { x: x2, y: y2 } }) => {
        if (x1 != x2) {
            return x1 - x2;
        } else {
            return y1 - y2;
        }
    });

    const res : (string|number)[][]=[[b.size.width, b.size.height]];

    return res
        .concat(blocks.map( ({ position: {x,y}, energy_type, type }) => [x , y, energy_type[0], type[0]]))
        .map((e) => e.join(':'))
        .join('|');
}


const TYPE_MAP : {[k:string]: Type } = BLOCK_TYPES.reduce((acc, e: Type) => ({...acc, [e[0]]: e}), {});

const ENERGY_MAP : {[k:string] : EnergyType} = ENERGIES.reduce((acc, e: EnergyType) => ({...acc, [e[0]]: e}), {});

const parseIntArray = (a : string[]) : number[] => a.map((e) => parseInt(e, 10));

export function unserializeBoard(s: string): BoardLogic {
    const [size, ...blocks] = s.split('|');
    const [width, height] = parseIntArray(size.split(':'));


    const logic = new BoardLogic({width, height});

    blocks.forEach((e, i) => {
        const [x, y, energy, type] = e.split(':');
        const block = new BlockLogic(ENERGY_MAP[energy], {x: parseInt(x, 10), y: parseInt(y, 10)}, TYPE_MAP[type], i);
        logic.addBlock(block);
    });

    return logic;

}