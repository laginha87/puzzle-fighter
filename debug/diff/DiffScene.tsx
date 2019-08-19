import { BoardView, BlockView } from 'src/view';
import blocksJson from 'assets/blocks.json';
import blocksPng from 'assets/blocks.png';

export class DiffScene extends Phaser.Scene {
    public boards!: BoardView[];

    public preload() {
        this.load.atlas('blocks', blocksPng, blocksJson);
        this.boards.forEach( e => e.preload());
    }

    public init() {
        this.boards.forEach( e => e.init());
    }

    public start() {
    }

    public create() {
        this.boards.forEach( (board) =>{
            board.create();
            Object.values(board.logic.blocks).forEach((e) => {
                const view = new BlockView(e, {width: 32, height: 32});
                view.scene = this;
                view.create();
                board.container.add(view.sprite);
                view.refresh();
                e.view = view;

                return view;
            });

        });
    }


    public update(a : number, b : number) {
        this.boards.forEach( e => e.update(a, b));
    }
}