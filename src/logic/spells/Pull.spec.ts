import { PlayerLogic } from '~src/logic';
import { Pull } from '~src/logic/spells';
import { unserializeBoard } from '~src/serializeBoard';
import 'tests/Helpers';

test('basic again', async () => {
    const board = unserializeBoard('10:10|4:7:c:r|4:8:c:r|4:9:c:r');
    const p: PlayerLogic = new PlayerLogic({board, spells:[], type:'ai'});

    const spell = new Pull({
        owner: p,
        adversary: p,
        level: 2
    });

    spell.cast();

    let res;
    do {
        res = spell.update(0, 100);
    } while(res === false);

    await expect(board)
        .toBoardMatch('10:10|9:7:c:r|9:8:c:r|9:9:c:r');
});
