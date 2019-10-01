import { StageLogic } from '~src/logic/stages/StageLogic';
import { ENERGIES, EnergyType, PlayerLogic } from '~src/logic';
import { getRandom } from '~src/utils';
import { fromEvent, merge, Subject, Observable, of } from 'rxjs';
import { first, reduce, filter, mapTo, delay, concatMap, concatMapTo, take, tap } from 'rxjs/operators';
import { Spell, SpellContext } from '../spells';

type State = 'loading' | 'waiting' | 'atacking';

class MountainStageSpell extends Spell {
    constructor(context : SpellContext, private stage: MountainStageLogic) {
        super(context);
    }

    cast(){
        of(null).pipe(
            concatMapTo(this.stage.generateWaitStream(3000)),

        )
    }
}

export class MountainStageLogic extends StageLogic {
    state?: State;
    energy?: EnergyType;
    gameTime$!: Subject<number>;

    start(initialColor = <EnergyType>getRandom(<any>ENERGIES)): void {
        this.gameTime$ = new Subject();
        this.enqueueColorRequest(initialColor);
    }

    update(time: number, delta: number): void {
        this.gameTime$.next(time);
    }

    private enqueueColorRequest( energy: EnergyType) {

        const playersDropAction$ = merge(
            ...this.match.players.map(p =>
                fromEvent(<any>p.events, 'set_next')
                    .pipe(mapTo(p)
                )
            )
        );

        of(null)
            .pipe(
                concatMapTo(this.generateWaitStream(3000)),
                tap(() => {
                    this.state = 'waiting';
                    this.energy = energy;
                }),
                concatMap(() => playersDropAction$.pipe(first())),
                tap((p: PlayerLogic) => {
                    this.state = 'atacking';
                }),
                concatMapTo(this.generateWaitStream(3000))
            )
            .subscribe({ next: () => { }});
    }

    public generateWaitStream(time : number) {
        return this.gameTime$.pipe(
            reduce((acc, value) => value + acc),
            filter((e) => e > time),
            first()
        );
    }
}