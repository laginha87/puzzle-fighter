import { BoardLogic, MatchLogic, PlayerLogic, PlayerType } from 'src/logic';
import { BoardView, GameView, MatchView, PlayerView, BoardTextView } from 'src/view';
import { MetaSpell } from 'src/logic/spells';
import { Stage } from 'src/logic/stages';
import { StageLogic } from '~src/logic/StageLogic';
import { StageView } from '~src/view/StageView';
import { MountainStageView } from '~src/view/stages/MountainStageView';

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
        spells: MetaSpell[],
        type: PlayerType,
    }[];
    stage: Stage;
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
            const player = new PlayerLogic({ board, spells: playerConfig.spells, type: playerConfig.type});
            board.player = player;

            return player;
        });
        const match = new MatchLogic(players);
        const stage = new StageLogic(match, config.stage);
        match.stage = stage;

        return match;
    }

    static BUILD_VIEW(config: MatchConfig, logic: MatchLogic) {
        const { layout: { players: playerLayouts, blockSize } } = config;

        const match = new config.meta.matchClass('match');

        const players = logic.players.map((e, i) => {
            const playerConfig = playerLayouts[i];

            const board = new BoardView(e.board, { ...playerConfig.board, blockSize });
            const player = new PlayerView(e, board, { ...playerConfig.player, blockSize });
            const effects = new BoardTextView({ ...playerConfig.board_text, blockSize }, e);

            player.scene = match;
            player.board.scene = match;
            effects.scene = match;

            board.player = player;

            return player;
        });
        const stageView = new MountainStageView();
        stageView.scene = match;
        const stage = new StageView(logic.stage, stageView);
        stage.scene = match;

        match.players = players;
        match.logic = logic;
        match.stage = stage;

        return match;
    }
}
