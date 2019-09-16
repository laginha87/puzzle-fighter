import { PlayerLogic, BoardLogic } from '~src/logic';


const BoardLogicStub = (): BoardLogic => {
    const board = new BoardLogic({ width: 5, height: 10 });
    const player = new PlayerLogic({board, spells: [], type: 'ai'});
    board.player = player;
    player.start();

    return board;
};


const PlayerLogicStub = (): PlayerLogic => {
    const board = new BoardLogic({ width: 5, height: 10 });
    const player = new PlayerLogic({board, spells: [], type: 'ai'});
    player.start();

    return player;
};


const Stubs = {
    player: PlayerLogicStub,
    board: BoardLogicStub
};

export default Stubs;