import Stubs from 'tests/Stubs';
import { SpellManager } from './SpellManager';


const setup = (): SpellManager => {
    const board = Stubs.board();

    return new SpellManager(board);
};


test('basic again', () => {
    const spellManager = setup();

});
