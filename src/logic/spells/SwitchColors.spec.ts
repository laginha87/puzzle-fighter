import { SwitchColors } from './SwitchColors';
import { PlayerLogic } from 'src/logic';

test('basic again', () => {
    const p = <PlayerLogic>{};
    const spell = new SwitchColors();

    expect(spell.cast(p))
        .toBe(true);
});
