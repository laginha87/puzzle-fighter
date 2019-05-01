import { BaseLogic, PlayerLogic } from '~src/logic';

type EVENTS = 'a';

export class MatchLogic implements BaseLogic {
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
