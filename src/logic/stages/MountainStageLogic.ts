import { StageLogic } from '~src/logic/stages/StageLogic';
import { ENERGIES, EnergyType, PlayerLogic, MatchLogic } from '~src/logic';
import { getRandom } from '~src/utils';
import { fromEvent, merge, Subject, Observable, of } from 'rxjs';
import { first, scan, filter, mapTo, concatMap, concatMapTo, tap, takeLast, takeWhile } from 'rxjs/operators';
import eventemitter3 from 'eventemitter3';

type Events = 'add_falling_blocks' | 'loading' | 'waiting' | 'attacking';

export class MountainStageLogic extends StageLogic {
    energy?: EnergyType;
    gameTime$!: Subject<number>;
    events! : eventemitter3<Events>;

    constructor(protected match : MatchLogic) {
        super(match);
        this.events = new eventemitter3();
    }

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
                    .pipe(
                        mapTo(p)
                )
            )
        );

        of(null)
            .pipe(
                tap(() => { this.energy = energy; }),
                concatMapTo(this.generateWaitStream(3000)),
                tap(() => {
                    this.events.emit('waiting', this.energy)
                }),
                concatMap(() => playersDropAction$.pipe(first()))
            )
            .subscribe({ next: (player : PlayerLogic) => {
                player.board.enqueueEffect((game$ : Observable<number>) =>
                    of(null).pipe(
                        tap(() => {
                            this.events.emit('attacking');
                        }),
                        concatMapTo(this.generateWaitStream(2000, game$)),
                        concatMap(() => {
                            const { board } = player;
                            const { size: {width} } = board;

                            let movingBlocks = player.blockFactory.buildN(2 * width, this.energy, 'regular');


                            movingBlocks.forEach((e, i) => {
                                Object.assign(e, { id: e.id + 20, position: { x: Math.floor(i / 2), y: i % 2 }});
                            });

                            this.events.emit('add_falling_blocks', movingBlocks, board);

                            movingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);

                            return game$.pipe(
                                takeWhile(() => movingBlocks.length > 0),
                                tap((delta) => {
                                    movingBlocks = movingBlocks.filter((block) => {
                                        const { position } = block;
                                        const y = (position.y + delta * board.FALLING_BLOCK_SPEED);
                                        if (!board.canMoveTo({ x: position.x, y })) {
                                            if(!board.canMoveTo({ x: position.x, y: position.y })){
                                                block.position.y = Math.floor(block.position.y); // Fixes the mountain stage logic spec, because of rounding errors
                                            }

                                            board.addBlock(block);

                                            return false;
                                        }
                                        position.y = y;

                                        return true;
                                    });
                                }),
                            );
                        }),
                        takeLast(1),
                        mapTo(null)
                    )
                );
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