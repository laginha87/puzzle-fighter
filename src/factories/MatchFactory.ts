import { BoardLogic } from '~/src/logic/BoardLogic';
import { MatchLogic } from '~/src/logic/MatchLogic';
import { PlayerLogic } from '~/src/logic/PlayerLogic';
import { BoardView } from '~/src/view/BoardView';
import { MatchView } from '~/src/view/MatchView';
import { PlayerView } from '~/src/view/PlayerView';
import { GameView } from '~/src/view/GameView';

interface MatchConfig {
    game: GameView;
}

export class MatchFactory {
    public static BUILD(config: MatchConfig) {
        const board = this.BUILD_BOARD();
        const player = this.BUILD_PLAYER(board);

        return this.BUILD_MATCH(config.game, [player]);
    }

    public static BUILD_BOARD() {
        const logic = new BoardLogic();

        return new BoardView(logic, {
            origin: { x: 40, y: 40 },
            size: { width: 10, height: 15 },
            blockSize: { width: 30, height: 30 }
        });
    }

    public static BUILD_PLAYER(board: BoardView) {
        const logic = new PlayerLogic(board.logic);

        const view = new PlayerView(logic, board);

        view.board = board;

        return view;
    }

    public static BUILD_MATCH(game: GameView, players: PlayerView[]) {
        const logic = new MatchLogic(players.map(({ logic }) => logic));
        const view = new MatchView('match');
        view.logic = logic;
        view.players = players;
        players.forEach(e => {
            e.scene = view
            e.board.scene = view
        });

        return view;
    }
}
