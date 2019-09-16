import { PlayerLogic } from '~src/logic';
import { SwitchColors } from '~src/logic/spells';
import { unserializeBoard } from '~src/serializeBoard';
import 'tests/Helpers';

test('basic again', async () => {
    const board = unserializeBoard('10:10|7:9:c:e|8:9:c:b|9:9:c:b');
    const p: PlayerLogic = new PlayerLogic({board, spells: [], type: 'ai'});

    const spell = new SwitchColors({
        owner: p,
        adversary: p,
        level: 2
    });

    spell.cast();

    spell.update(0, 400);
    spell.update(0, 400);
    spell.update(0, 400);

    expect(spell.update(0,10))
        .toBe(true);

    await expect(board)
        .toBoardMatch('10:10|7:9:w:e|8:9:w:b|9:9:w:b');
});
