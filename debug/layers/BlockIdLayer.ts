import { Layer } from 'debug/layers';
import { BoardLogic, BlockLogic, BlockId } from 'src/logic';

export class BlockIdLayer extends Layer {
    protected board!: BoardLogic;
    protected scene!: Phaser.Scene;
    protected origin!: Phaser.GameObjects.Container;
    public showing!: boolean;

    private texts: { [k in BlockId]: Phaser.GameObjects.Text } = {};

    create() {
        const board = this.match.players[0].board;
        this.board = <BoardLogic>(board.logic);
        this.scene = board.scene;
        this.origin = board.container;
        this.created = true;
    }

    update() {
        if (!this.showing) {
            Object.values(this.texts)
                .forEach((e) => {
                    e.destroy();
                });
            this.texts = {};

            return;
        }

        Object.keys(this.texts)
            .forEach((e) => {
                const id = <BlockId>parseInt(e, 10);
                if (this.board.blocks[id] === undefined) {
                    this.texts[id].destroy();
                    delete this.texts[id];
                } else {
                    const { position: { x, y } } = this.board.blocks[id];
                    this.texts[id].setPosition(this.origin.x + x * 32, this.origin.y + y * 32 + 8);
                }
            });

        Object.values(this.board.blocks)
            .forEach(e => {
                const block = this.board.blocks[e.id];
                if (this.texts[block.id] == undefined) {
                    const { position: { x, y }, id } = e;
                    const text = this.scene.add.text(this.origin.x + x * 32, this.origin.y + y * 32 + 8, id.toString());
                    this.texts[id] = text;
                }
            });
    }
}