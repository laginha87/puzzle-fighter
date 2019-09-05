import { BoardLogic } from 'src/logic/BoardLogic';
import { serializeBoard } from 'src/serializeBoard';
const terminalImage = require('terminal-image');
import blocksJson from 'assets/blocks.json';
import blocksPng from 'assets/blocks.png';


import Jimp from 'jimp';

const imagifyBoard = async (board : BoardLogic) => {
    const blocks = await Jimp.read(blocksPng);
    console.log(blocks)

    const image = new Jimp(board.size.width * 30 ,  board.size.height * 30, (err, image) => {
        // image.composite()
      });
}
expect.extend({
    async toBoardMatch(received : BoardLogic, expected : string) : Promise<{message: () => string, pass: boolean}>{
        const serializedBoard = serializeBoard(received);
        const message = await terminalImage.file('assets/blocks.png');
        imagifyBoard(received);
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