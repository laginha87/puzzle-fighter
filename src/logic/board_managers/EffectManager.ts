import { BoardManager } from '~src/logic/board_managers';
import { BoardLogic } from '~src/logic';
import { Subject, Observable, concat } from 'rxjs';
import { tap } from 'rxjs/operators';

type EffectStream = (game$ : Observable<number>) => Observable<null>;

export class EffectManager extends BoardManager {
    private gameTime$: Subject<number>;
    private effects: Observable<null>[];
    private finished: boolean = false;

    constructor(board: BoardLogic) {
        super(board);
        this.gameTime$ = new Subject<number>();
        this.effects = [];
    }

    activate() {
        const active$ = concat(...this.effects);
        this.effects = [];
        this.finished = false;

        active$.subscribe(() => this.finished = true);
    }

    enqueue(effectGenerator : EffectStream) {
        this.effects.push(effectGenerator(this.gameTime$));
    }

    update(time: number, delta: number): boolean {
        this.gameTime$.next(delta);

        return this.finished;
    }

    hasEffects() {
        return this.effects.length > 0;
    }
}