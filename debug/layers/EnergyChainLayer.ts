import { BlockLayer } from 'debug/layers';
import { BoardLogic, BlockLogic } from 'src/logic';

type Color = 0xff0000 | 0x00ff00 | 0x0000ff | 0xf0f000;

export class EnergyChainLayer extends BlockLayer<Color> {
    name = "EnergyChainLayer"

    update() {
        this.graphics.clear();
        // tslint:disable-next-line: no-string-literal
        this.board.managers.falling['fallingBlocks'].forEach((b) => {
            this.drawBlock(b, 0xff0000);
        });
    }
}