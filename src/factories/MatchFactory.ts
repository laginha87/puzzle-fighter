import { BoardLogic, MatchLogic, PlayerLogic } from 'src/logic';
import { BoardView, GameView, MatchView, PlayerView, BoardTextView } from 'src/view';
import { MetaSpell } from 'src/logic/spells';

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
        spells: MetaSpell[]
    }[];
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
            const player = new PlayerLogic(board, playerConfig.spells);
            board.player = player;

            return player;
        });

        return new MatchLogic(players);
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

        match.players = players;
        match.logic = logic;

        return match;
    }
}
