import { BoardLogic } from 'src/logic';
import { BoardView, BlockView } from 'src/view';
import blocksJson from 'assets/blocks.json';
import blocksPng from 'assets/blocks.png';

export class DiffScene extends Phaser.Scene {
    public view!: BoardView;

    public preload() {
        const img = document.createElement('img');
        img.src = blocksPng;
        this.textures.addAtlasJSONHash('blocks', img, blocksJson);
        this.view.preload();
    }

    public init() {
        this.view.init()
    }

    public start() {
    }

    public create() {
        this.view.create();
        Object.values(this.view.logic.blocks).forEach((e) => {
            const view = new BlockView(e, {width: 32, height: 32});
            view.scene = this;
            view.create();
            // this.view.container.add(view.sprite);
            view.refresh();
            e.view = view;

            return view;
        })
    }


    public update(a : number, b : number) {
        this.view.update(a, b);
    }
}