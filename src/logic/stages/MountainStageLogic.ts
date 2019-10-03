import { StageLogic } from '~src/logic/stages/StageLogic';
import { ENERGIES, EnergyType, PlayerLogic } from '~src/logic';
import { getRandom } from '~src/utils';
import { fromEvent, merge, Subject, Observable, of } from 'rxjs';
import { first, scan, filter, mapTo, concatMap, concatMapTo, tap, takeLast } from 'rxjs/operators';

type State = 'loading' | 'waiting' | 'atacking';

export class MountainStageLogic extends StageLogic {
    state?: State;
    energy?: EnergyType;
    gameTime$!: Subject<number>;

    start(initialColor = <EnergyType>getRandom(<any>ENERGIES)): void {
        this.gameTime$ = new Subject();
        this.enqueueColorRequest(initialColor);
    }

    update(time: number, delta: number): void {
        this.gameTime$.next(delta);
    }

    private enqueueColorRequest( energy: EnergyType) {

        const playersDropAction$ = merge(
            ...this.match.players.map(p =>
                fromEvent(<any>p.events, 'action:fall')
                    .pipe(mapTo(p)
                )
            )
        );

        of(null)
            .pipe(
                tap(() => { this.energy = energy; }),
                concatMapTo(this.generateWaitStream(3000)),
                tap(() => {
                    this.state = 'waiting';
                }),
                concatMap(() => playersDropAction$.pipe(first()))
            )
            .subscribe({ next: (player : PlayerLogic) => {
                player.board.enqueueEffect((game$ : Observable<number>) =>
                    of(null).pipe(
                        tap(() => {
                            this.state = 'atacking';
                        }),
                        concatMapTo(this.generateWaitStream(3000, game$)),
                        concatMap(() => {
                            const { board } = player;
                            const { size: {width} } = board;

                            let movingBlocks = player.blockFactory.buildN(2 * width);

                            movingBlocks.forEach((e, i) => {
                                Object.assign(e.position, { x: i / 2, y: i%2 });
                            });

                            return game$.pipe(
                                tap((delta) => {
                                    movingBlocks = movingBlocks.filter((block) => {
                                        const { position } = block;
                                        const y = (position.y + delta * board.FALLING_BLOCK_SPEED);
                                        if (!board.canMoveTo({ x: position.x, y: Math.floor(y) })) {
                                            position.y = Math.ceil(position.y);
                                            board.addBlock(block);

                                            return false;
                                        }
                                        position.y = y;

                                        return true;
                                    });
                                }),
                            )
                        }),
                        takeLast(1),
                        mapTo(null)
                    )
                )
            }});
    }

    public generateWaitStream(time : number, gameTime$ : Observable<number> = this.gameTime$) {
        return gameTime$.pipe(
            scan((acc, value) => value + acc),
            filter((e) => e > time),
            first()
        );
    }
}