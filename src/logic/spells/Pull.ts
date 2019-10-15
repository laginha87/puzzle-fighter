import { EnergyType } from '~src/logic';
import { Spell } from '~src/logic/spells/Spell';
import { BoardLogic, BlockLogic } from '~src/logic';
import { Observable, of } from 'rxjs';
import { takeWhile, tap, mapTo, takeLast, concatMapTo } from 'rxjs/operators';

export class Pull extends Spell {
    static cost: EnergyType[] = ['elemental'];
    static spellName = 'Pull';

    private board!: BoardLogic;

    private movingBlocks!: BlockLogic[];

    public cast(gameTime$ : Observable<number>) {
        const { board: { blocks: boardBlocks, size: { width, height } } } = this.adversary;

        return of(null).pipe(
            tap(
                ()=>{
                    this.board = this.adversary.board;
                    let movingBlocks = Object.values(boardBlocks);
                    this.adversary.board.loosenBlocks(movingBlocks);
                    movingBlocks.sort((a, b) => b.position.x - a.position.x);
                    this.movingBlocks = movingBlocks;
                }
            ),
            concatMapTo(gameTime$.pipe(
            takeWhile(() => this.movingBlocks.length > 0),
            tap((delta) => {
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
            }))),
            takeLast(1),
            mapTo(null)
        );
    }
}