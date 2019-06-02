import { PlayerLogic } from 'src/logic';
import { Updatable } from 'src/utils';
import * as EventEmitterType from 'eventemitter3';
import { EventEmitter } from 'eventemitter3';

type EVENTS = 'a';

export class MatchLogic implements Updatable {
    public events! : EventEmitterType<EVENTS>;
    constructor(public players: PlayerLogic[]) {
        this.events = new EventEmitter();
    }

    public start() {
        this.players.forEach(e => e.start());
    }

    public update(time: number, delta: number): void {
        this.players.forEach((p) => p.update(time, delta));
    }
}
