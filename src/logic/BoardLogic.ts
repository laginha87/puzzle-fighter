import { BaseLogic, PieceLogic } from '~/src/logic';

export class BoardLogic extends BaseLogic {
    public _piece: PieceLogic;

    public set piece(p: PieceLogic) {
        this._piece = p;
        if (p) {
            p.x = 32 * 3;
            p.y = 0;
            p.board = this;
        }
    }

    public get piece() {
        return this._piece;
    }

    public update(time: number, delta: number): void {
        super.update(time, delta);
        this._piece.update(time, delta);
    }

    public canMoveTo(x: number, y: number) {
        if (x < 0 || x > 500 || y < 0 || y > 500) {
            return false;
        }

        return true;
    }
}
