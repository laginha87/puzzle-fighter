import { PlayerLogic, MatchLogic } from '~src/logic';
import { unserializeBoard } from '~src/serializeBoard';
import 'tests/Helpers';
import { MountainStageLogic } from '~src/logic/stages/MountainStageLogic';

test('it starts', async () => {
    const board = unserializeBoard('10:10|7:9:c:e|8:9:c:b|9:9:c:b');
    const p = new PlayerLogic({board, spells: [], type: 'ai'});
    const match = new MatchLogic([p]);
    const stage = new MountainStageLogic(match);

    stage.start('elemental');

    expect(stage.effect).not.toBe(null);
    expect(stage.energy).toBe('elemental');
});

test('after it starts it sets its state to waiting and color to initial color', async () => {
    const board = unserializeBoard('10:10|7:9:c:e|8:9:c:b|9:9:c:b');
    const p = new PlayerLogic({board, spells: [], type: 'ai'});
    const match = new MatchLogic([p]);
    const stage = new MountainStageLogic(match);

    stage.start('elemental');
    stage.update(0, 3002);

    expect(stage.state).toBe('waiting');
    expect(stage.energy).toBe('elemental');
});



test('when user sets block he takes a hit', async () => {
    const board = unserializeBoard('10:10|0:9:e:r|1:8:e:b|1:9:e:b|2:9:e:e|3:9:w:e|4:9:o:e|5:9:o:r|6:7:o:r|6:8:o:r|6:9:o:r|9:9:c:r');
    const p = new PlayerLogic({board, spells: [], type: 'ai'});
    const match = new MatchLogic([p]);
    const stage = new MountainStageLogic(match);

    stage.start('elemental');
    stage.update(0, 3002);
    // p.events.emit();

    await expect(board).toBoardMatch('10:10|0:7:n:r|0:8:n:r|0:9:e:r|1:6:n:r|1:7:n:r|1:8:e:b|1:9:e:b|2:7:n:r|2:8:n:r|2:9:e:e|3:7:n:r|3:8:n:r|3:9:w:e|4:7:n:r|4:8:n:r|4:9:o:e|5:7:n:r|5:8:n:r|5:9:o:r|6:5:n:r|6:6:n:r|6:7:o:r|6:8:o:r|6:9:o:r|7:8:n:r|7:9:n:r|8:8:n:r|8:9:n:r|9:7:n:r|9:8:n:r|9:9:c:r');
});