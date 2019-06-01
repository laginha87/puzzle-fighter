import { Layer } from 'debug/layers';
import { BoardLogic, BlockLogic } from 'src/logic';

type Color = 0xff0000 | 0x00ff00 | 0x0000ff | 0xf0f000;

export class BlockLayer extends Layer {
    protected board!: BoardLogic;
    protected graphics!: Phaser.GameObjects.Graphics;
    protected origin!: Phaser.GameObjects.Container;
    public showing!: boolean;
    public created : boolean = false;

    create() {
        const board = this.match.players[0].board;
        this.board = <BoardLogic>(board.logic);
        this.graphics = board.scene.add.graphics();
        this.origin = board.container;
        this.created = true;
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