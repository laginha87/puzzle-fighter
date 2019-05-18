import { BoardManager } from 'src/logic/board_managers';

export class PieceManager extends BoardManager {
    update(time: number, delta: number): void {
        this.board.piece.update(time, delta);
    }

}