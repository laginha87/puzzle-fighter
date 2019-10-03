import { PlayerLogic } from '~src/logic';
import { Updatable } from '~src/utils';
import * as EventEmitterType from 'eventemitter3';
import { EventEmitter } from 'eventemitter3';
import { StageLogic } from '~src/logic/stages';

type EVENTS = 'a';

export class MatchLogic implements Updatable {
    public events! : EventEmitterType<EVENTS>;
    public stage!: StageLogic;

    constructor(public players: PlayerLogic[]) {
        this.events = new EventEmitter();
    }

    public start() {
        this.players.forEach(e => e.start());
        this.stage.start();
    }

    public update(time: number, delta: number): void {
        this.players.forEach((p) => p.update(time, delta));
        this.stage.update(time, delta);
    }
}
