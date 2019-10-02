import { EnergyType } from '~src/logic';
import { Spell } from '~src/logic/spells';
import { BoardLogic } from '~src/logic';
import { Observable } from 'rxjs';
import { takeWhile, tap, mapTo, takeLast } from 'rxjs/operators';

export class Pull extends Spell {
    static cost: EnergyType[] = ['elemental'];
    static spellName = 'Pull';

    private board!: BoardLogic;

    public cast(gameTime$ : Observable<number>) {
        const { board: { blocks: boardBlocks, size: { width, height } } } = this.adversary;
        this.board = this.adversary.board;

        let movingBlocks = Object.values(boardBlocks);
        this.adversary.board.loosenBlocks(movingBlocks);
        movingBlocks.sort((a, b) => b.position.x - a.position.x);

        return gameTime$.pipe(
            takeWhile(() => movingBlocks.length > 0),
            tap((delta) => {
                movingBlocks = movingBlocks.filter((block) => {
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
            }),
            takeLast(1),
            mapTo(null)
        );
    }
}