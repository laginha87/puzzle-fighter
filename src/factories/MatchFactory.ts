import { BoardLogic, MatchLogic, PlayerLogic } from '~/src/logic';
import { BoardView, GameView, MatchView, PlayerView } from '~/src/view';

interface MatchConfig {
    game: GameView;
}

const blockSize = { width: 32, height: 32 };

const CONFIG = {
    layout: {
        board: {
            blockSize,
            origin: { x: 40, y: 40 }
        },
        player: {
            blockSize,
            origin: { x: 0, y: 0 },
            next: { x: 500, y: 40 }
        },
        piece: {
            blockSize
        }
    },
    boardLogic: {
        width: 10, height: 15
    },
};


export class MatchFactory {
    public static BUILD(config: MatchConfig) {
        const board = this.BUILD_BOARD();
        const player = this.BUILD_PLAYER(board);

        return this.BUILD_MATCH(config.game, [player]);
    }

    public static BUILD_BOARD() {
        const logic = new BoardLogic(CONFIG.boardLogic);

        return new BoardView(logic, CONFIG.layout.board);
    }

    public static BUILD_PLAYER(board: BoardView) {
        const logic = new PlayerLogic(board.logic);
        const view = new PlayerView(logic, board, CONFIG.layout.player);
        view.board = board;

        return view;
    }

    public static BUILD_MATCH(game: GameView, players: PlayerView[]) {
        const logic = new MatchLogic(players.map(({ logic }) => logic));
        const view = new MatchView('match');
        view.logic = logic;
        view.players = players;
        players.forEach(e => {
            e.scene = view;
            e.board.scene = view;
        });

        return view;
    }
}
