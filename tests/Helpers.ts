import { BoardLogic } from 'src/logic/BoardLogic';
import { serializeBoard } from 'src/serializeBoard';
const terminalImage = require('terminal-image');

expect.extend({
    async toBoardMatch(received : BoardLogic, expected : string) : Promise<{message: () => string, pass: boolean}>{
        const serializedBoard = serializeBoard(received);
        const message = await terminalImage.file('assets/blocks.png');

        return {
            message: () => `Expected ${message} to match ${message}`,
            pass: false
        };

        if(serializedBoard === expected) {
            return {
                message: () => 'Matches',
                pass: true
            };
        }

        return {
            message: () => `Boards didn't match check diff = ${encodeURI(`http://localhost:1234/diff?b1=${expected}&b2=${serializedBoard}`)}`,
            pass: false
        };

    }
});