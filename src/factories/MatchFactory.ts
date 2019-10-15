import { BoardLogic, MatchLogic, PlayerLogic, PlayerType } from '~src/logic';
import { BoardView, GameView, MatchView, PlayerView, BoardTextView } from '~src/view';
import { SpellName, SPELL_LOGICS } from '~src/logic/spells';
import { StageName, STAGE_LOGICS } from '~src/logic/stages';
import { STAGE_VIEWS } from '~src/view/stages';

type Position = {
    x: number,
    y: number
};

type Size = {
    width: number,
    height: number
};

export interface MatchConfig {
    game: GameView;
    layout: {
        players: {
            board: {
                origin: Position
            };
            board_text: {
                origin: Position
            },
            player: {
                origin: Position
                next: Position
            }
        }[];
        blockSize: Size;
    };
    boardSize: Size;
    players: {
        spells: SpellName[],
        type: PlayerType,
    }[];
    stage: StageName;
    meta: {
        matchClass: typeof MatchView
    };
}



export class MatchFactory {

    public static BUILD(config: MatchConfig): MatchView {
        const logic = this.BUILD_LOGIC(config);

        return this.BUILD_VIEW(config, logic);
    }

    static BUILD_LOGIC(config: MatchConfig) {
        const players = config.players.map((playerConfig) => {
            const board = new BoardLogic(config.boardSize);
            const player = new PlayerLogic({ board, spells: playerConfig.spells.map((e) => SPELL_LOGICS[e]), type: playerConfig.type});
            board.player = player;

            return player;
        });
        const match = new MatchLogic(players);
        const stage = new STAGE_LOGICS[config.stage](match);
        match.stage = stage;

        return match;
    }

    static BUILD_VIEW(config: MatchConfig, logic: MatchLogic) {
        const { layout: { players: playerLayouts, blockSize } } = config;

        const match = new config.meta.matchClass('match');

        const players = logic.players.map((e, i) => {
            const playerConfig = playerLayouts[i];

            const board = new BoardView(e.board, { ...playerConfig.board, blockSize });
            e.board.view = board;
            const player = new PlayerView(e, board, { ...playerConfig.player, blockSize });
            const effects = new BoardTextView({ ...playerConfig.board_text, blockSize }, e);

            player.scene = match;
            player.board.scene = match;
            effects.scene = match;

            board.player = player;

            return player;
        });
        const stage = new STAGE_VIEWS[config.stage](match, logic.stage, {blockSize});
        stage.scene = match;

        match.players = players;
        match.logic = logic;
        match.stage = stage;

        return match;
    }
}
