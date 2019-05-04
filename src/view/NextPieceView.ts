import { SceneState, PieceView, Position, Size } from '~src/view';

export class NextPieceView implements SceneState {
    scene: Phaser.Scene;
    private _piece: PieceView;

    constructor(private origin: Position, private blockSize: Size) {
    }


    public set piece(v: PieceView) {
        this._piece = v;
        const { x, y } = this.origin;
        const { height: blockHeight } = this.blockSize;
        this.piece.setPosition(x, y);
        this.piece.blocks.forEach((e, i) => {
            e.setPosition(0, i * blockHeight);
        });
    }

    public get piece(): PieceView {
        return this._piece;
    }



}