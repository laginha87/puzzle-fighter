import { PlayerController } from '~src/controllers';
import EventEmitter = require('eventemitter3');

type EVENTS = 'onRotate' | 'onMoveLeft' | 'onMoveRight' | 'onFall' | 'onMoveDown' | 'onSpell';
export class TestPlayerController implements PlayerController {
    events: EventEmitter<EVENTS>;
    constructor() {
        this.events = new EventEmitter();
    }

    onRotate(cb: () => void): void {
        this.events.on('onRotate', cb);
    }
    onMoveLeft(cb: () => void): void {
        this.events.on('onMoveLeft', cb);
    }
    onMoveRight(cb: () => void): void {
        this.events.on('onMoveRight', cb);
    }
    onFall(cb: () => void): void {
        this.events.on('onFall', cb);
    }
    onMoveDown(cb: () => void): void {
        this.events.on('onMoveDown', cb);
    }
    onSpell(cb: (i: number) => void): void {
        this.events.on('onSpell', cb);
    }


}