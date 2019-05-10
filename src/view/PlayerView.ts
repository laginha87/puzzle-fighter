import { PlayerLogic } from 'src/logic';
import { BoardView, SceneState, PieceView } from 'src/view';
import { LayoutConfig } from 'src/view/Types';
import { Position } from 'src/types';

export class PlayerView implements SceneState {
    public scene!: Phaser.Scene;
    public nextContainer: Phaser.GameObjects.Container;
    public next: PieceView;

    constructor(public logic: PlayerLogic,
            public board: BoardView,
            private layout: LayoutConfig & { next: Position }
        ) {
        this.logic.events.on('set_next', () => {
            this.next = new PieceView(this.logic.next, this.layout);
            this.next.scene = this.scene;
            this.next.create();
            this.nextContainer.add(this.next.container);
        });
    }

    public init() {
    }

    public preload() {
        this.board.preload();
    }

    public create() {
        this.board.create();
        this.nextContainer = this.scene.add.container(this.layout.next.x, this.layout.next.y);
    }

    update(time: number, delta: number) {
        this.board.update(time, delta);
    }
}
