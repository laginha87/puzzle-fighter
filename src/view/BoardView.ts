import layoutJson from '~/assets/layout.json';
import layoutPng from '~/assets/layout.png';
import { BlockFactory } from '~src/factories';
import { BoardLogic } from '~src/logic';
import { Position, SceneState, Size } from '~src/view';


interface BoardConfig {
    origin: Position;
    size: Size;
    blockSize: Size;
}

export class BoardView implements SceneState {
    public scene!: Phaser.Scene;

    constructor(public logic: BoardLogic, private config: BoardConfig) {
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
    }

    update(time: number, delta: number) {
    }
}
