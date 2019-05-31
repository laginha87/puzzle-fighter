
import { BlockLayer } from 'debug/layers';

export class FallingBlockLayer extends BlockLayer {
    name = 'FallingBlockLayer';
    showing = JSON.parse(localStorage.getItem('showFalling') || 'true');
    update() {
        this.graphics.clear();
        if (!this.showing) { return; }
        // tslint:disable-next-line: no-string-literal
        this.board.managers.falling['fallingBlocks'].forEach((b) => {
            this.drawBlock(b, 0xff0000);
        });
    }
}