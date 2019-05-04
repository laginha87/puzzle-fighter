import layoutJson from '~/assets/layout.json';
import layoutPng from '~/assets/layout.png';
import { BoardLogic } from '~src/logic';
import { Position, SceneState, Size, PieceView } from '~src/view';


interface BoardConfig {
    origin: Position;
    size: Size;
    blockSize: Size;
}

export class BoardView implements SceneState {
    public scene!: Phaser.Scene;
    public _piece: PieceView;
    private container = Phaser.GameObjects.Container;

    constructor(public logic: BoardLogic, private config: BoardConfig) {
    }

    public init() {

    }

    public preload() {
        const img = document.createElement('img');
        img.src = layoutPng;
        this.scene.textures.addAtlasJSONHash('layout', img, layoutJson);
    }

    public set piece(p : PieceView) {
        this.container.add(p.container);
        this._piece = p;

        const {
            config: {
                blockSize: {
                    width, height
                }
            }
        } = this;

        // p.setPosition(3 * width, 0);
    }

    public get piece() {
        return this._piece;
    }

    public create() {
        const {
            config: {
                blockSize: {
                    width: blockWidth,
                    height: blockHeight
                },
                size: {
                    width, height
                },
                origin: {
                    x, y
                }
            }
        } = this;


        for (let i = y; i < (y + height * blockHeight); i += 10) {
            this.scene.add.sprite(x, i, 'layout', 'column.ase');
            let a = this.scene.add.sprite(x + width * blockWidth, i, 'layout', 'column.ase');
            a.setRotation(Math.PI);
        }

        for (let i = x + 10; i < x + width * blockWidth; i += 10) {
            let a = this.scene.add.sprite(i, y - 10, 'layout', 'column.ase');
            a.setRotation(Math.PI / 2);
            a = this.scene.add.sprite(i, (y + height * blockHeight), 'layout', 'column.ase');
            a.setRotation(Math.PI * 3/2);
        }

        this.scene.add.sprite(x + 2, y - 8, 'layout', 'corner.ase');

        let a = this.scene.add.sprite(x - 2 + width * blockWidth, y - 8, 'layout', 'corner.ase');
        a.setRotation(Math.PI / 2);

        a = this.scene.add.sprite(x - 2 + width * blockWidth, y - 2 + height * blockHeight, 'layout', 'corner.ase');
        a.setRotation(Math.PI);

        a = this.scene.add.sprite(x + 2, y - 2 + height * blockHeight, 'layout', 'corner.ase');
        a.setRotation(Math.PI * 3 / 2);

        // TODO: Type annotation is messed up
        this.container = <any>this.scene.add.container(x, y);
    }

    update(time: number, delta: number) {
        this.piece.update(time, delta);
    }
}
