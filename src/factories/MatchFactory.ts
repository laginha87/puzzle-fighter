import { BoardLogic } from "src/logic/BoardLogic";
import { MatchLogic } from "src/logic/MatchLogic";
import { PlayerLogic } from "src/logic/PlayerLogic";
import { BoardView } from "src/view/board";
import { MatchView } from "src/view/match";
import { PlayerView } from "src/view/player";

interface MatchConfig {

}

export class MatchFactory {
    public static BUILD(config: MatchConfig) {
        const board = this.BUILD_BOARD();
        const player = this.BUILD_PLAYER(board);

        return this.BUILD_MATCH([player]);
    }

    public static BUILD_BOARD() {
        const logic = new BoardLogic();
        return new BoardView(logic);
    }

    public static BUILD_PLAYER(board: BoardView) {
        const logic = new PlayerLogic(board.logic);
        return new PlayerView(logic);
    }

    public static BUILD_MATCH(players: PlayerView[]) {
        const logic = new MatchLogic(players.map(({ logic }) => logic));
        return new MatchView(logic);
    }
}
