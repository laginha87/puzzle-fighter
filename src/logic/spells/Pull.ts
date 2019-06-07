import { EnergyType, BlockLogic } from 'src/logic';
import { Spell } from 'src/logic/spells';
import { BoardLogic } from 'src/logic';

export class Pull extends Spell {
    static cost: EnergyType[] = [''];
    static spellName = 'Pull';

    private movingBlocks: BlockLogic[] = [];
    private board!: BoardLogic;

    public cast() {
        const { board: { blocks: boardBlocks, size: { width, height } } } = this.adversary;
        this.board = this.adversary.board;

        const blocks = Object.values(boardBlocks);
        this.adversary.board.loosenBlocks(blocks);
        blocks.sort((a, b) => b.position.x - a.position.x);
        this.movingBlocks = blocks;
    }

    public update(time: number, delta: number): boolean {
        this.movingBlocks = this.movingBlocks.filter((block) => {
            const { position } = block;
            const x = (position.x + delta * this.board.FALLING_BLOCK_SPEED);
            if (!this.board.canMoveTo({ x: Math.ceil(x), y: position.y })) {
                position.x = Math.ceil(position.x);
                this.board.addBlock(block);

                return false;
            }
            position.x = x;

            return true;
        });

        return this.movingBlocks.length === 0;
    }

}