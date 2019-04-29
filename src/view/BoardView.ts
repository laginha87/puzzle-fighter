import layoutJson from '~/assets/layout.json';
import layoutPng from '~/assets/layout.png';
import { BoardLogic } from '~/src/logic/BoardLogic';
import { SceneState, Position, Size } from '~src/view/Types';


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
            console.log(x * width * blockWidth)
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


    // img.src = columnImg;
    //     this.textures.addAtlasJSONHash("layout", img, columnData);
    //     for (let i = 10; i < 500; i += 10) {
    //         this.add.sprite(10, i, "layout", "column.ase");
    //         this.add.sprite(300, i, "layout", "column.ase");
    //     }

    //     for (let i = 20; i < 290; i++) {
    //         let a = this.add.sprite(i, 0, "layout", "column.ase");
    //         a.setRotation(1.5708);
    //         a = this.add.sprite(i, 500, "layout", "column.ase");
    //         a.setRotation(1.5708);

    //     }

    //     this.add.sprite(10, 5, "layout", "corner.ase");
    //     const a = this.add.sprite(300, 500, "layout", "corner.ase");
    //     a.setRotation(1.5708 * 2);
}
