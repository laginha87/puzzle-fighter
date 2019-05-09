import { Updatable } from 'src/utils';
import { MatchView } from 'src/view';
import { BoardLogic } from 'src/logic';

export class Layer  implements Updatable{
    constructor(protected match : MatchView) {

    }
    update(time: number, delta: number): void {
    }

    create() {

    }
}

export class BlockLayer extends Layer {
    private board : BoardLogic;


    create() {
        const board = this.match.players[0].board;
        this.board = board.logic;
        const rect = new Phaser.Geom.Rectangle(board.container.x, board.container.y, board.container.width, board.container.height);
        const graphics = board.scene.add.graphics();
        graphics.setAlpha(0.3);
        graphics.fillStyle(255);
        graphics.fillRectShape(rect);
    }

    update(time, delta) {

    }
}