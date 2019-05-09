import { BoardLogic, MatchLogic, PlayerLogic } from 'src/logic';
import { BoardView, GameView, MatchView, PlayerView } from 'src/view';

interface MatchConfig {
    game: GameView;
    layout: {
        players: {
            board: {
                origin: {
                    x: number;
                    y: number;
                };
            };
            player: {
                origin: {
                    x: number;
                    y: number;
                };
                next: {
                    x: number;
                    y: number;
                };
            };
        }[];
        blockSize: {
            width: number;
            height: number;
        };
    };
    boardSize: {
        width: number;
        height: number;
    };
    players: {}[];
}



export class MatchFactory {
    public static BUILD(config: MatchConfig): MatchView {
        const logic = this.BUILD_LOGIC(config);

        return this.BUILD_VIEW(config, logic);
    }

    static BUILD_LOGIC(config: MatchConfig) {
        const players = config.players.map((e) => {
            const board = new BoardLogic(config.boardSize);
            const player = new PlayerLogic(board);
            board.player = player;

            return player;
        });

        return new MatchLogic(players);
    }

    static BUILD_VIEW(config: MatchConfig, logic: MatchLogic) {
        const { layout: { players: playerLayouts, blockSize } } = config;

        const match = new MatchView('match');

        const players = logic.players.map((e, i) => {
            const playerConfig = playerLayouts[i];

            const board = new BoardView(e.board, { ...playerConfig.board, blockSize });
            const player = new PlayerView(e, board, { ...playerConfig.player, blockSize });

            player.scene = match;
            player.board.scene = match;

            return player;
        });

        match.players = players;
        match.logic = logic;

        return match;
    }
}
