import 'tests/Helpers';

// tslint:disable-next-line: no-relative-imports
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

    it('starts ids off at 1000', () => {
        const factory = new TestBlockFactory('w:e');
        const block = factory.build();

        expect(block.id).toEqual(1000);
    });

    it('ignores the energy pool when building pieces', () => {
        const factory = new TestBlockFactory('w:r|c:b');
        factory.energyPool = ['chaos', 'chaos'];

        const piece = factory.buildPiece();

        expect(piece[0].energy_type).toBe('willpower');
        expect(piece[0].type).toBe('regular');

        expect(piece[1].energy_type).toBe('chaos');
        expect(piece[1].type).toBe('breaker');
    });

    it('doesn\'t blow up when it reaches the end', () => {
        const factory = new TestBlockFactory('w:r');

        const blocks = factory.buildN(3);

        expect(blocks[0].energy_type).toBe('willpower');
        expect(blocks[0].type).toBe('regular');
        expect(blocks[1]).not.toBe(undefined);
    });

    it('signals when it\'s done', () => {
        const factory = new TestBlockFactory('w:r');

        expect(factory.finished).toBe(false);

        factory.buildN(3);

        expect(factory.finished).toBe(true);
    });
});
