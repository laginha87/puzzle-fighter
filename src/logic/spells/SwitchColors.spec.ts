import { PlayerLogic, BoardLogic } from 'src/logic';
import { SwitchColors } from 'src/logic/spells';

test('basic again', () => {
    const b: BoardLogic = new BoardLogic({ width: 5, height: 5 });
    const p: PlayerLogic = new PlayerLogic(b);

    const spell = new SwitchColors({
        owner: p,
        adversary: p,
        level: 2
    });

    spell.cast();


    expect(spell.update(0, 10000))
        .toBe(true);
});
