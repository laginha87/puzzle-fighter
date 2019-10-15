import { BoardLogic, PlayerLogic, MatchLogic } from '~src/logic';
import { STAGE_LOGICS, StageName } from '~src/logic/stages';
import { SpellName, SPELL_LOGICS } from '~src/logic/spells';
import { BlockFactory } from '~src/factories';
import { Size } from '~src/types';
import { TestPlayerController } from 'tests/TestPlayerController';

type TestConfig = Partial<{
    stageName: StageName;
    players: Partial<{
        spells: SpellName[]
        blockFactory: BlockFactory
        type: 'ai'
    }>[],
    boardSize: Size
}>;

interface TestPlayer extends PlayerLogic {
    _controller: TestPlayerController;
}
interface TestMatch extends MatchLogic{
    players: TestPlayer[];
}

export class TestFactory {
    static BUILD(config : TestConfig) : TestMatch {
        const stageName = config.stageName || 'mountain';
        const playersConfig = config.players || [{type: 'ai'}];
        const boardSize = config.boardSize || { width: 10, height: 10 };
        const players = playersConfig.map(({type, spells, blockFactory}) => {
            type  = type || 'ai';
            blockFactory = blockFactory || new BlockFactory();
            spells = spells || [];

            const board = new BoardLogic(boardSize);
            const player = new PlayerLogic({ board, spells: spells.map((e) => SPELL_LOGICS[e]), type, blockFactory});
            player.controller = new TestPlayerController();
            board.player = player;

            return <TestPlayer>player;
        });
        const match = <TestMatch>(new MatchLogic(players));
        const stage = new STAGE_LOGICS[stageName](match);
        match.stage = stage;

        return match;

    }
}