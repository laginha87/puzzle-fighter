import { BlockLayer } from 'debug/layers';


export class BlocksLayer extends BlockLayer {
    name = 'BlocksLayer';
    showing = JSON.parse(localStorage.getItem('showBlocks') || 'true');
    update() {
        this.graphics.clear();
        if (!this.showing) { return; }
        // tslint:disable-next-line: no-string-literal
        this.board.grid.forEach((l, x) => {
            l.forEach((b, y) => {
                if (b) {
                    this.drawBlock(b, 0x0000ff);
                }
            });
        });
    }
}
