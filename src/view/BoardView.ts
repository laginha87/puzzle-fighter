import layoutJson from 'assets/layout.json';
import layoutPng from 'assets/layout.png';
import { BoardLogic, BlockLogic } from 'src/logic';
import { SceneState, PieceView, BlockView, PlayerView } from 'src/view';
import { LayoutConfig } from '~src/view/types';

export class BoardView implements SceneState {
    public scene!: Phaser.Scene;
    public container!: Phaser.GameObjects.Container;
    public piece!: PieceView;
    public player!: PlayerView;
    private blocks: BlockView[] = [];

    constructor(public logic: BoardLogic, private layout: LayoutConfig) {
        this.logic.events.on('set_piece', () => {
            this.piece = this.player.next;
            this.container.add(this.piece.container);
        });

        this.logic.events.on('init_piece', () => {
            this.piece = new PieceView(this.logic.piece, this.layout);
            this.piece.scene = this.scene;
            this.piece.create();
            this.container.add(this.piece.container);
        });

        this.logic.events.on('break_piece', () => {
            this.piece.blocks.forEach(e => {
                this.container.add(e.sprite);
                e.update(0, 0);
                this.blocks.push(e);
            });
            this.piece.container.destroy();
            delete this.piece;
        });

        this.logic.events.on('destroy_blocks', (blocks : BlockLogic[]) => {
            const views = blocks.map((e) => e.view!);
            views.forEach((e) => e.sprite.destroy());
            this.blocks = this.blocks.filter((e) => !views.includes(e));
        });
    }

    public init() {

    }

    public preload() {
        const img = document.createElement('img');
        img.src = layoutPng;
        this.scene.textures.addAtlasJSONHash('layout', img, layoutJson);
    }

    public create() {
        const {
            layout: {
                blockSize: {
                    width: blockWidth,
                    height: blockHeight
                },
                origin: {
                    x, y
                }
            }
        } = this;

        const { height, width } = this.logic.size;

        for (let i = y; i < (y + height * blockHeight); i += 10) {
            this.scene.add.sprite(x, i, 'layout', 'column.ase');
            let a = this.scene.add.sprite(x + width * blockWidth, i, 'layout', 'column.ase');
            a.setRotation(Math.PI);
        }

        for (let i = x + 10; i < x + width * blockWidth; i += 10) {
            let a = this.scene.add.sprite(i, y - 10, 'layout', 'column.ase');
            a.setRotation(Math.PI / 2);
            a = this.scene.add.sprite(i, (y + height * blockHeight), 'layout', 'column.ase');
            a.setRotation(Math.PI * 3 / 2);
        }

        this.scene.add.sprite(x + 2, y - 8, 'layout', 'corner.ase');

        let a = this.scene.add.sprite(x - 2 + width * blockWidth, y - 8, 'layout', 'corner.ase');
        a.setRotation(Math.PI / 2);

        a = this.scene.add.sprite(x - 2 + width * blockWidth, y - 2 + height * blockHeight, 'layout', 'corner.ase');
        a.setRotation(Math.PI);

        a = this.scene.add.sprite(x + 2, y - 2 + height * blockHeight, 'layout', 'corner.ase');
        a.setRotation(Math.PI * 3 / 2);

        this.container = this.scene.add.container(x, y);
    }

    update(time: number, delta: number) {
        if (this.piece) {
            this.piece.update(time, delta);
        }
        this.blocks.forEach((e) => e.update(time, delta));
    }
}
