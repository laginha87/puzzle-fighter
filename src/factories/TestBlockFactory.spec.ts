import { PlayerLogic, MatchLogic } from '~src/logic';
import { unserializeBoard } from '~src/serializeBoard';
import 'tests/Helpers';
import { MountainStageLogic } from '~src/logic/stages/MountainStageLogic';
import { TestBlockFactory } from './TestBlockFactory';

describe('TestBlockFactory', () => {
    it('builds regular blocks from templates', () => {
        const factory = new TestBlockFactory('w:r|c:r|e:r|n:r|o:r');

        [
            'willpower',
            'chaos',
            'elemental',
            'nature',
            'order'
        ].forEach((energy_type) => {
            const block = factory.build();
            expect(block.energy_type).toBe(energy_type);
            expect(block.type).toBe('regular');
        });
    });

    it('builds breaker blocks from templates', () => {
        const factory = new TestBlockFactory('w:b|c:b|e:b|n:b|o:b');

        [
            'willpower',
            'chaos',
            'elemental',
            'nature',
            'order'
        ].forEach((energy_type) => {
            const block = factory.build();
            expect(block.energy_type).toBe(energy_type);
            expect(block.type).toBe('breaker');
        });
    });

    it('builds energy blocks from templates', () => {
        const factory = new TestBlockFactory('w:e|c:e|e:e|n:e|o:e');

        [
            'willpower',
            'chaos',
            'elemental',
            'nature',
            'order'
        ].forEach((energy_type) => {
            const block = factory.build();
            expect(block.energy_type).toBe(energy_type);
            expect(block.type).toBe('energy');
        });
    });
});
