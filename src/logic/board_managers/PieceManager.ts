import { BoardManager } from '~src/logic/board_managers';

export class PieceManager extends BoardManager {
    update(time: number, delta: number): boolean {
        return this.board.piece.update(time, delta);
    }

}