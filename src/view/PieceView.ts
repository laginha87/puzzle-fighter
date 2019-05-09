import { SceneState, BlockView, LayoutConfig } from 'src/view';
import { PieceLogic } from 'src/logic';

export class PieceView implements SceneState {
    scene: Phaser.Scene;
    container: Phaser.GameObjects.Container;
    blocks: BlockView[];

    constructor(public logic: PieceLogic, private config: LayoutConfig) {
    }

    create() {
        this.container = <any>this.scene.add.container(0, 0);
        this.blocks = this.logic.blocks.map((e, i) => {
            e.position.y = i;
            const view = new BlockView(e, this.config.blockSize);
            view.scene = this.scene;
            view.create();
            this.container.add(view.sprite);
            view.refresh();
            e.view = view;

            return view;
        });
    }

    update(time, delta) {
        const { x, y } = this.logic.position;
        const { width, height } = this.config.blockSize;
        this.container.setPosition(x * width, y * height);
        this.blocks.forEach((e) => e.update(time, delta));
    }


}