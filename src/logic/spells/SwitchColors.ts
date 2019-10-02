import { EnergyType, BlockLogic } from '~src/logic';
import { Spell } from '~src/logic/spells';
import { Observable, of } from 'rxjs';
import { scan, take, concatMap, mapTo, tap, takeLast, first } from 'rxjs/operators';

export class SwitchColors extends Spell {
    static cost: EnergyType[] = ['nature'];
    static spellName = 'Switch Colors';

    public cast(gameTime$: Observable<number>) {

        const numberOfBlocks = this.level * 2;
        const blocks = Object.values(this.owner.board.blocks);
        let blocksToChange : BlockLogic[]= [];
        while (blocksToChange.length < numberOfBlocks && blocks.length !== 0) {
            const i = Math.floor(Math.random() * blocks.length);
            const block = blocks[i];
            blocks.splice(i, 1);
            if (block.energy_type !== 'willpower') {
                blocksToChange.push(block);
            }
        }

        return of(...blocksToChange)
                .pipe(
                    concatMap((block) =>
                        gameTime$.pipe(
                            scan((acc, rec) => acc + rec),
                            first((e) => e > 200),
                            mapTo(block)
                        )),
                    tap((block) => {
                        block.energy_type = 'willpower';
                        block.notifyChange();
                    }),
                    take(numberOfBlocks),
                    takeLast(1),
                    mapTo(null)
                );
    }
}
