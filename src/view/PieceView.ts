import { SceneState, BlockView } from '~src/view';
import { PieceLogic } from '~src/logic';

export class PieceView implements SceneState {
    scene: Phaser.Scene;
    blocks: BlockView[];
    container: Phaser.GameObjects.Container;

    constructor(public logic: PieceLogic) {
    }

    public setPosition(x: number, y: number){
        this.container.setPosition(x, y);
    }

    create() {
        this.blocks = this.logic.blocks.map(e => new BlockView(e));
        this.blocks.forEach(e => e.scene = this.scene);
        this.blocks.forEach(e => e.create());
        const sprites = this.blocks.map((e) => e.sprite);
        this.container = <any>this.scene.add.container(-100, -100, sprites);
    }

    update(time, delta) {
        const {x, y} = this.logic;
        this.container.setPosition(x, y);
    }


}