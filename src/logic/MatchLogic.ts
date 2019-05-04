import { PlayerLogic } from '~src/logic';
import { EventEmitter, Updatable } from '~src/utils';

type EVENTS = 'a';

export class MatchLogic implements Updatable {
    public events : EventEmitter<EVENTS>;
    constructor(public players: PlayerLogic[]) {

    }

    public start() {
        this.players.forEach(e => e.start());
    }

    public update(time: number, delta: number): void {
        this.players.forEach((p) => p.update(time, delta));
    }
}
