import { unserializeBoard } from '~src/serializeBoard';
import { BoardLogic } from '~src/logic';

interface SyncMessage {
    data: { board: string, type: string; };
}

type AiMessage = SyncMessage;

const actions = ['moveLeft', 'moveRight', 'fall', 'rotate', 'moveDown'];

class Ai {
    private board? : BoardLogic;

    handleMessage({data} : AiMessage) {
        switch(data.type) {
            case 'sync':
                this.board = unserializeBoard(data.board);

                return;
        }
    }

    move() {
        postMessage({
            type: 'move',
            direction: actions[Math.floor(Math.random() * actions.length)]
        });
    }
}

const ai = new Ai();

setInterval(() => {
    ai.move();
}, 1000);

onmessage = (e) => ai.handleMessage(e);

