import { PlayerController } from '~src/controllers/PlayerController';
import eventemitter3  from 'eventemitter3';
import { MatchLogic, PlayerLogic } from '~src/logic';
import { serializeBoard } from '~src/serializeBoard';

export class AiController implements PlayerController {
    worker : Worker;
    events : eventemitter3<'rotate'|'moveLeft'|'moveRight'|'fall'|'moveDown'|'spell'>;

    constructor(private match : MatchLogic, private player : PlayerLogic) {
        this.worker = new Worker('/src/workers/AiWorker.ts');
        this.worker.onmessage = this.parseMessage.bind(this);
        this.events = new eventemitter3();
        player.board.events.on('land_block', this.syncBoard.bind(this));
    }

    syncBoard(){
        this.worker.postMessage({type: 'sync', board: serializeBoard(this.player.board)});
    }

    parseMessage(message : MessageEvent) {
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