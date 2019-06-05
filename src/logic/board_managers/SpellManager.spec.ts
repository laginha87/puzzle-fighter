import { EnergyPoolLogic } from 'src/logic';
import Stubs from 'src/logic/__test__/Stubs';
import { SpellManager } from './SpellManager';


const setup = (): SpellManager => {
    const board = Stubs.board();

    return new SpellManager(board);
};


test('basic again', () => {
    const spellManager = setup();

});
