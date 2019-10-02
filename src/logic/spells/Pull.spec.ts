import { PlayerLogic } from '~src/logic';
import { Pull } from '~src/logic/spells';
import { unserializeBoard } from '~src/serializeBoard';
import 'tests/Helpers';

test('basic again', async () => {
    const board = unserializeBoard('10:10|4:7:c:r|4:8:c:r|4:9:c:r');
    const p: PlayerLogic = new PlayerLogic({board, spells:[], type:'ai'});
    board.player = p;

    const spell = new Pull({
        owner: p,
        adversary: p,
        level: 2
    });

    spell.klass = Pull;

    board.castSpell(spell);
    board.managers.effects.activate();
    Object.assign(board, {activeManager: 'effects'});

    do {
        board.update(0, 100);
    // tslint:disable-next-line: no-string-literal
    } while(board['activeManager'] === 'effects' );

    await expect(board)
        .toBoardMatch('10:10|9:7:c:r|9:8:c:r|9:9:c:r');
});
