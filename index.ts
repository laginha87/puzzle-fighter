import { ClientGame } from 'src/game/ClientGame';
import { MatchFactory, MatchConfig } from 'src/factories/MatchFactory';
import { MatchView } from 'src/view';



const game = new ClientGame('container');
game.init();

const config : MatchConfig = {
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
    game: game.view,
    meta: {
        matchClass: MatchView
    }
};

const match = MatchFactory.BUILD(config);
game.view.phaser.scene.add('match', match);
// game.start()
game.view.phaser.scene.start('match');

window.match = match;
window.game = game;