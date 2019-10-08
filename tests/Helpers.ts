import { BoardLogic } from '~src/logic/BoardLogic';
import { serializeBoard, unserializeBoard } from '~src/serializeBoard';
const terminalImage = require('terminal-image');
import {readFileSync} from 'fs';

const blocksJson = JSON.parse(<any>readFileSync('assets/blocks.json'));

import Jimp from 'jimp';

const imagifyBoard = async (board : BoardLogic) => {
    const blocks = await Jimp.read('assets/blocks.png');

    const image = await Jimp.create(board.size.width * 32 ,  board.size.height * 32);
    Object.values(board.blocks).forEach((block) => {
        const spriteName = [block.type, block.energy_type].join('_');
        const {x,y,w,h} = blocksJson.frames[`${spriteName}.ase`].frame;
        image.composite(blocks.clone().crop(x,y,w,h), block.position.x * 32, block.position.y * 32);
    });

    for (let i = 0; i < board.size.height; i++) {
        for (let j = 0; j < board.size.width; j++) {
            for (let l = 0; l < 32; l++) {
                image.setPixelColor(0xffffff, i * 32 + l, j * 32);
                image.setPixelColor(0xffffff, i * 32, j * 32 + l);
                image.setPixelColor(0xffffff, i * 32 + l, (j + 1) * 32);
                image.setPixelColor(0xffffff, (i + 1) * 32, j * 32 + l);
            }
        }
    }

    return image;
}


expect.extend({
    async toBoardMatch(received : BoardLogic, expected : string) : Promise<{message: () => string, pass: boolean}>{
        const serializedBoard = serializeBoard(received);

        if(serializedBoard === expected) {
            return {
                message: () => 'Matches',
                pass: true
            };
        }

        const receivedImage = await imagifyBoard(received);
        const expectedImage = await imagifyBoard(unserializeBoard(expected));

        const receivedImageMessage = await terminalImage.buffer(await receivedImage.getBufferAsync(Jimp.MIME_PNG));
        const expectedImageMessage = await terminalImage.buffer(await expectedImage.getBufferAsync(Jimp.MIME_PNG));

        return {
            message: () => `
            Boards didn't match check diff = ${encodeURI(`http://localhost:1234/diff?b1=${expected}&b2=${serializedBoard}`)}\n
            Expected\n${receivedImageMessage}\n
            To Match\n${expectedImageMessage}`,
            pass: false
        };

    }
});