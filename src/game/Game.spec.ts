import { TestFactory } from '~src/factories/TestFactory';
import { TestBlockFactory } from '~src/factories/TestBlockFactory';
import { updateUntil } from 'tests/updateUntil';
import 'tests/Helpers';

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

            updateUntil(match, () => board.piece === firstPiece);

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
            updateUntil(match, () => board.piece === firstPiece);

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
            updateUntil(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|6:8:w:r|6:9:c:b');
        });

        it('moves all the way to the right', async () => {
            const blockFactory = new TestBlockFactory('w:r|c:b');
            const match = TestFactory.BUILD({players:[{
                blockFactory
            }]}),

            { players: [{_controller: controller, board}] } = match;


            match.start();
            const firstPiece = board.piece;

            controller.right();
            controller.right();
            controller.right();
            controller.right();
            controller.right();

            updateUntil(match, () => board.piece === firstPiece);

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

            updateUntil(match, () => board.piece === firstPiece);

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

            updateUntil(match, () => board.piece === firstPiece);

            await expect(board).toBoardMatch('10:10|5:8:c:b|5:9:w:r');
        });
    });
});