import { PlayerController } from "./PlayerController";
import { EventEmitter } from 'eventemitter3';
import * as EventEmitterType from 'eventemitter3';
import { MatchLogic } from "~src/logic";

export class AiController implements PlayerController {
    worker : Worker;
    events : EventEmitterType<'rotate'|'moveLeft'|'moveRight'|'fall'|'moveDown'|'spell'>;

    constructor(private match : MatchLogic) {
        this.worker = new Worker('/src/workers/AiWorker.ts');
        this.worker.onmessage = this.parseMessage.bind(this);
        this.events = new EventEmitter();
    }

    parseMessage(message : MessageEvent) {
        console.log(message.type)
        switch(message.data.type) {
            case 'move':
                return this.events.emit(message.data.direction);
        }

    }

    onRotate(cb: () => void): void {
        this.events.on('rotate', cb);
    }
    onMoveLeft(cb: () => void): void {
        this.events.on('moveLeft', cb);
    }
    onMoveRight(cb: () => void): void {
        this.events.on('moveRight', cb);
    }
    onFall(cb: () => void): void {
        this.events.on('fall', cb);
    }
    onMoveDown(cb: () => void): void {
        this.events.on('moveDown', cb);
    }
    onSpell(cb: (i: number) => void): void {
        this.events.on('spell', cb);
    }
}