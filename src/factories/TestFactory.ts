import { BoardLogic, PlayerLogic, MatchLogic } from '~src/logic';
import { STAGE_LOGICS, StageName } from '~src/logic/stages';
import { SpellName, SPELL_LOGICS } from '~src/logic/spells';

const TEST_CONFIG ={
    players: [
        {
            type: <'ai'>'ai'
        }
    ],
    boardSize: {
        width: 10,
        height: 20
    }
};

export class TestFactory {
    static BUILD(stageName: StageName = 'mountain', spells: SpellName[] = []) {
        const players = TEST_CONFIG.players.map((playerConfig) => {
            const board = new BoardLogic(TEST_CONFIG.boardSize);
            const player = new PlayerLogic({ board, spells: spells.map((e) => SPELL_LOGICS[e]), type: playerConfig.type});
            board.player = player;

            return player;
        });
        const match = new MatchLogic(players);
        const stage = new STAGE_LOGICS[stageName](match);
        match.stage = stage;

        return match;

    }
}