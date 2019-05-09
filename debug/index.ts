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
debug.layers.push(new BlockLayer(match));
const _update = match.update;

let created = false;

let paused = false;

match.update = (time, delta) => {
    if(!paused) {
        _update.bind(match)(time, delta);
    }
    if (!created) {
        debug.create();
        created = true;
    }
    debug.update(time, delta);
};

const a : HTMLDivElement = document.querySelector('#pause-btn');
a.onclick = () => {
    paused = !paused
}