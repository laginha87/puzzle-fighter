import { ClientGame } from 'src/game/ClientGame';
import { MatchFactory, MatchConfig } from 'src/factories/MatchFactory';
import { MatchView } from 'src/view';
import { SwitchColors } from '~src/logic/spells';



const game = new ClientGame('#container');
game.init();

const config: MatchConfig = {
    layout: {
        players: [
            {
                board_text: {
                    origin: { x: 40, y: 40 }
                },
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
        {
            spells: [
                SwitchColors,
                SwitchColors,
                SwitchColors,
                SwitchColors,
                SwitchColors,
            ]
        }
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

const global = <any>window;
global.match = match;
global.game = game;