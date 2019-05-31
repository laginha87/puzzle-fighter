import { BlockLayer } from 'debug/layers';


export class GridLayer extends BlockLayer {
    name = 'GridLayer';
    showing = JSON.parse(localStorage.getItem('showGrid') || 'true');
    update() {
        this.graphics.clear();
        if (!this.showing) { return; }
        // tslint:disable-next-line: no-string-literal
        this.board.grid.forEach((l, x) => {
            l.forEach((b, y) => {
                if (b) {
                    this.drawGridBlock(x, y, 0x0000ff);
                }
            });
        });
    }
}
