import { Updatable } from 'src/utils';
import { MatchView } from 'src/view';
import { BoardLogic, BlockLogic } from 'src/logic';


type Color = 0xff0000 | 0x00ff00 | 0x0000ff;

export class Layer implements Updatable {
    constructor(protected match: MatchView) {

    }
    update(time: number, delta: number): void {
    }

    create() {

    }
}

export class BlockLayer extends Layer {
    private board: BoardLogic;
    private graphics: Phaser.GameObjects.Graphics;
    private origin: Phaser.GameObjects.Container;

    create() {
        const board = this.match.players[0].board;
        this.board = board.logic;
        this.graphics = board.scene.add.graphics();
        this.origin = board.container;
    }

    update(time, delta) {

        this.graphics.clear();
        this.board['blocks'].forEach((l) => {
            l.forEach((b) => {
                if (b) {
                    this.drawBlock(b, 0x00ff00);
                }
            });
        });

        this.board['fallingBlocks'].forEach((b) => {
            this.drawBlock(b, 0xff0000);
        });
    }

    drawBlock(b: BlockLogic, color: Color) {
        this.graphics.fillStyle(color, 0.7);
        const rect = new Phaser.Geom.Rectangle(this.origin.x + b.position.x * 32, this.origin.y + b.position.y * 32, 32, 32);
        this.graphics.fillRectShape(rect);
    }
}