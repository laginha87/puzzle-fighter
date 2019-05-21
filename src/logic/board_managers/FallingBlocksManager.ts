import { BoardLogic, BlockLogic, PieceLogic } from 'src/logic';
import { BoardManager } from 'src/logic/board_managers';

export class FallingBlocksManager extends BoardManager {
    private fallingBlocks: BlockLogic[] = [];

    constructor(public board: BoardLogic) {
        super(board)
        board.events.on('break_piece', (piece: PieceLogic) => {
            this.fallingBlocks.push(...piece.blocks);
            this.fallingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);
            this.board.state = 'blocks_falling';
        });

        board.events.on('destroy_blocks', () => {
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
            if(this.fallingBlocks.length  === 0) {
                this.board.player.nextPiece();
                this.board.state = 'piece_falling';

                return;
            }

            this.board.loosenBlocks(this.fallingBlocks);

            this.fallingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);

            this.board.state = 'blocks_falling';
        })
    }

    update(time: number, delta: number): void {
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
        if (this.fallingBlocks.length === 0) {
            this.board.state = 'destroying_blocks';
        }
    }

}