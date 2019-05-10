import { ClientGame } from 'src/game/ClientGame';
import { MatchFactory } from 'src/factories/MatchFactory';
import { Debug } from './debug';
import { BlockLayer } from './layer';



const game = new ClientGame('container');
game.init();

const config = {
    layout: {
        players: [
            {
                board: {
                    origin: { x: 40, y: 40 }
                },
                player: {
                    origin: { x: 0, y: 0 },
                    next: { x: 500, y: 40 }
                }
            }
        ],
        blockSize: { width: 32, height: 32 },
    },
    boardSize: { width: 10, height: 15 },
    players: [
        {}
    ],
    game: game.view
};

const match = MatchFactory.BUILD(config);
game.view.phaser.scene.add('match', match);
game.view.phaser.scene.start('match');

window.match = match;
window.game = game;

const debug = new Debug();
const blockLayer = new BlockLayer(match);
debug.layers.push(blockLayer);
const _update = match.update;

let created = false;

let paused = false;

match.update = (time, delta) => {
    if (!paused) {
        _update.bind(match)(time, delta);
    }
    if (!created) {
        debug.create();
        created = true;
    }
    debug.update(time, delta);
};

const a: HTMLDivElement = document.querySelector('#pause-btn');
a.onclick = () => {
    paused = !paused;
}

//  TODO
const blockSpeed = document.querySelector('#blockSpeed');
blockSpeed.value = localStorage.getItem('block-speed') || 0.04;

blockSpeed.onchange = (e) => {
    match.players[0].board.logic.FALLING_BLOCK_SPEED = e.currentTarget.value;
    localStorage.setItem('block-speed', e.currentTarget.value);
}

const pieceBlock = document.querySelector('#pieceSpeed');
pieceBlock.value = localStorage.getItem('piece-speed') || 0.007;
pieceBlock.onchange = (e) => {
    match.players[0].board.piece.logic.FALLING_SPEED = e.currentTarget.value;
    localStorage.setItem('piece-speed', e.currentTarget.value);
}

['showGrid', 'showBlocks', 'showFalling'].forEach((e) => {
    document.querySelector(`#${e}`).onchange = (ee) => {
        const checked = ee.currentTarget.checked;
        blockLayer[e] = checked;
    }
})