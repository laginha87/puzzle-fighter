import { TestFactory } from '~src/factories/TestFactory';
import { TestBlockFactory } from '~src/factories/TestBlockFactory';
import { updateWhile } from 'tests/updateWhile';
import 'tests/Helpers';
import { testSequence } from 'tests/testSequence';

describe('Game', () => {
    describe('simple controls', () => {
        it('falls a block', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]}),
            {players: [{board}]} = match;

            match.start();
            const firstPiece = board.piece;

            updateWhile(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|5:8:w:r|5:9:c:b');
        });

        it('moves left', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]}),

            { players: [{_controller: controller, board}] } = match;


            match.start();
            const firstPiece = board.piece;

            controller.left();
            updateWhile(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|4:8:w:r|4:9:c:b');
        });

        it('moves right', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]}),

            { players: [{_controller: controller, board}] } = match;


            match.start();
            const firstPiece = board.piece;

            controller.right();
            updateWhile(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|6:8:w:r|6:9:c:b');
        });

        it('moves all the way to the right', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]}),;

            const { players: [{_controller: controller, board}] } = match;


            match.start();
            const firstPiece = board.piece;

            controller.right();
            controller.right();
            controller.right();
            controller.right();
            controller.right();

            updateWhile(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|9:8:w:r|9:9:c:b');
        });


        it('moves all the way to the left', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]}),

            { players: [{_controller: controller, board}] } = match;


            match.start();
            const firstPiece = board.piece;

            controller.left();
            controller.left();
            controller.left();
            controller.left();
            controller.left();
            controller.left();

            updateWhile(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|0:8:w:r|0:9:c:b');
        });


        it('rotates a block', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]}),

            { players: [{_controller: controller, board}] } = match;


            match.start();
            const firstPiece = board.piece;

            controller.rotate();
            controller.rotate();

            updateWhile(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|5:8:c:b|5:9:w:r');
        });
    });

    describe('advanced examples', () => {
        it('fall then left', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b|e:r|o:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]});

            const { players: [{board}]} = match;

            match.start();

            testSequence(match, [['fall'], ['left','left']]);
            await expect(board).toBoardMatch('10:10|3:8:e:r|3:9:o:b|5:8:w:r|5:9:c:b');
        });
    });
});