import { serializeBoard, unserializeBoard } from '~src/serializeBoard';
import { BoardLogic, BlockLogic } from '~src/logic';

test('serializeBoard', () => {
    const board = new BoardLogic({ width: 5, height: 10 });
    expect(serializeBoard(board))
        .toEqual('5:10');


    board.addBlock(new BlockLogic('willpower', {x: 4, y: 10}, 'breaker', 0));
    board.addBlock(new BlockLogic('willpower', {x: 1, y: 9}, 'breaker', 1));
    board.addBlock(new BlockLogic('willpower', {x: 2, y: 4}, 'breaker', 2));

    expect(serializeBoard(board))
        .toEqual('5:10|1:9:w:b|2:4:w:b|4:10:w:b');

});

test('unserializeBoard', () => {
    const board = unserializeBoard('5:10|1:9:w:b|2:4:c:r|4:10:n:e');

    expect(board.size.width)
        .toEqual(5);

    expect(board.size.height)
        .toEqual(10);

    expect(board.blocks[0].position)
        .toEqual({x:1, y:9});

    expect(board.blocks[0].energy_type)
        .toEqual('willpower');

    expect(board.blocks[0].type)
        .toEqual('breaker');

    expect(board.blocks[1].position)
        .toEqual({x:2, y:4});

    expect(board.blocks[1].energy_type)
        .toEqual('chaos');

    expect(board.blocks[1].type)
        .toEqual('regular');

    expect(board.blocks[2].position)
        .toEqual({x:4, y:10});

    expect(board.blocks[2].energy_type)
        .toEqual('nature');

    expect(board.blocks[2].type)
        .toEqual('energy');

});
