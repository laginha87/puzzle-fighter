import { BoardLogic, PlayerLogic, MatchLogic } from '~src/logic';
import { STAGE_LOGICS, StageName } from '~src/logic/stages';
import { SpellName, SPELL_LOGICS } from '~src/logic/spells';
import { BlockFactory } from '~src/factories';
import { Size } from '~src/types';

type TestConfig = Partial<{
    stageName: StageName;
    players: Partial<{
        spells: SpellName[]
        blockFactory: BlockFactory
        type: 'ai'
    }>[],
    boardSize: Size
}>;

export class TestFactory {
    static BUILD(config : Partial<TestConfig>) {
        const stageName = config.stageName || 'mountain';
        const playersConfig = config.players || [{type: 'ai'}];
        const boardSize = config.boardSize || { width: 10, height: 20 };
        const players = playersConfig.map(({type, spells, blockFactory}) => {
            type  = type || 'ai';
            blockFactory = blockFactory || new BlockFactory();
            spells = spells || [];

            const board = new BoardLogic(boardSize);
            const player = new PlayerLogic({ board, spells: spells.map((e) => SPELL_LOGICS[e]), type, blockFactory});
            board.player = player;

            return player;
        });
        const match = new MatchLogic(players);
        const stage = new STAGE_LOGICS[stageName](match);
        match.stage = stage;

        return match;

    }
}