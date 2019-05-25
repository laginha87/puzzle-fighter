import { BlockLogic, PieceLogic } from 'src/logic';
import { BoardManager } from 'src/logic/board_managers';

export class FallingBlocksManager extends BoardManager {
    private fallingBlocks: BlockLogic[] = [];

    public get isActive() {
        return this.fallingBlocks.length > 0;
    }

    update(time: number, delta: number): boolean {
        this.fallingBlocks = this.fallingBlocks.filter((block) => {
            const { position } = block;
            const y = (position.y + delta * this.board.FALLING_BLOCK_SPEED);
            if (!this.board.canMoveTo({ x: position.x, y })) {
                position.y = Math.ceil(position.y);
                this.board.addBlock(block);

                return false;
            }
            position.y = y;

            return true;
        });

        return this.fallingBlocks.length === 0;
    }

    breakPiece(piece : PieceLogic) {
        this.fallingBlocks.push(...piece.blocks);
        this.fallingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);
    }

    checkForFallingBlocks() {
        this.board.blocks.forEach((line) => {
            let falling = false;
            for (let y = this.board.size.height - 1; y >= 0; y--) {
                const element = line[y];
                if (element) {
                    if (falling) {
                        this.fallingBlocks.push(element);
                    }
                } else {
                    falling = true;
                }
            }
        });

        if (this.fallingBlocks.length !== 0) {
            this.board.loosenBlocks(this.fallingBlocks);
            this.fallingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);

            return;
        }
    }

}