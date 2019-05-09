import { Updatable } from 'src/utils';
import { MatchView } from 'src/view';
import { BoardLogic } from 'src/logic';

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
        this.graphics.fillStyle(0x900101, 0.7);
        this.board['blocks'].forEach((l) => {
            l.forEach((b) => {
                if (b) {
                    const rect = new Phaser.Geom.Rectangle(this.origin.x + b.position.x * 32, this.origin.y + b.position.y * 32, 32, 32);
                    this.graphics.fillRectShape(rect);
                }
            })
        })

        this.graphics.fillStyle(0x000090, 0.7);
        this.board['fallingBlocks'].forEach((b) => {
            const rect = new Phaser.Geom.Rectangle(this.origin.x + b.position.x * 32, this.origin.y + b.position.y * 32, 32, 32);
            this.graphics.fillRectShape(rect);
        });


    }
}