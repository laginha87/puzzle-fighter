import { PlayerController } from '~src/controllers';
import eventemitter3 from 'eventemitter3';

type EVENTS = 'onRotate' | 'onMoveLeft' | 'onMoveRight' | 'onFall' | 'onMoveDown' | 'onSpell';
export class TestPlayerController implements PlayerController {
    events: eventemitter3<EVENTS>;
    constructor() {
        this.events = new eventemitter3();
    }

    rotate() { this.events.emit('onRotate'); }
    left() { this.events.emit('onMoveLeft'); }
    right() { this.events.emit('onMoveRight'); }
    fall() { this.events.emit('onFall'); }
    down() { this.events.emit('onMoveDown'); }

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