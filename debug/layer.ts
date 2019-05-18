import { Updatable } from 'src/utils';
import { MatchView } from 'src/view';
import { BoardLogic, BlockLogic } from 'src/logic';


type Color = 0xff0000 | 0x00ff00 | 0x0000ff;

export class Layer implements Updatable {
    public name!: string;

    constructor(protected match: MatchView) {

    }
    update(time: number, delta: number): void {
    }

    create() {

    }
}

export class BlockLayer extends Layer {
    private board!: BoardLogic;
    private graphics!: Phaser.GameObjects.Graphics;
    private origin!: Phaser.GameObjects.Container;
    public showBlocks = true;
    public showGrid = true;
    public showFalling = true;
    public name = 'BlockLayer';

    create() {
        const board = this.match.players[0].board;
        this.board = board.logic;
        this.graphics = board.scene.add.graphics();
        this.origin = board.container;
    }

    update(time, delta) {

        this.graphics.clear();
        this.board['blocks'].forEach((l, x) => {
            l.forEach((b, y) => {
                if (b) {
                    if (this.showBlocks) { this.drawBlock(b, 0x00ff00); }
                    if (this.showGrid) { this.drawGridBlock(x, y, 0x0000ff); }
                }
            });
        });

        // this.board['fallingBlocks'].forEach((b) => {
        //     if (this.showFalling) { this.drawBlock(b, 0xff0000); }
        // });
    }

    drawBlock({ position: { x, y } }: BlockLogic, color: Color) {
        this.drawGridBlock(x, y, color);
    }

    drawGridBlock(x: number, y: number, color: Color) {
        this.graphics.fillStyle(color, 0.7);
        const rect = new Phaser.Geom.Rectangle(this.origin.x + x * 32, this.origin.y + y * 32, 32, 32);
        this.graphics.fillRectShape(rect);
    }
}