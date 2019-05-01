import { SceneState, BlockView } from '~src/view';
import { PieceLogic } from '~src/logic';

export class PieceView implements SceneState {
    scene: Phaser.Scene;
    blocks : BlockView[];
    constructor(public logic: PieceLogic) {
    }

    create() {
        this.blocks = this.logic.blocks.map(e => new BlockView(e));
        this.blocks.forEach(e => e.scene = this.scene);
        this.blocks.forEach(e => e.create());
    }


}