import { BoardLogic } from 'src/logic/BoardLogic';
import { serializeBoard } from 'src/serializeBoard';

expect.extend({
    toBoardMatch(received : BoardLogic, expected : string) : {message: () => string, pass: boolean}{
        const serializedBoard = serializeBoard(received);
        if(serializedBoard === expected) {
            return {
                message: () => 'Matches',
                pass: true
            };
        }

        return {
            message: () => `Boards didn't match check diff = http://localhost:1234/diff?b1=${serializedBoard}&b2=${expected}`,
            pass: false
        };

    }
});