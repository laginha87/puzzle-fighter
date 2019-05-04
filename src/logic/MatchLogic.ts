import { BaseLogic, PlayerLogic } from '~src/logic';
import { EventEmitter } from '~src/utils';

type EVENTS = 'a';

export class MatchLogic extends BaseLogic {
    public events : EventEmitter<EVENTS>;
    constructor(public players: PlayerLogic[]) {
        super();
    }

    public start() {
        this.players.forEach(e => e.start());
    }

    public update(time: number, delta: number): void {
        this.players.forEach((p) => p.update(time, delta));
    }
}
