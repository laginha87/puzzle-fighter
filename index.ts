import { ClientGame } from '~src/game/ClientGame';
import { MatchFactory, MatchConfig } from '~src/factories/MatchFactory';
import { MatchView } from '~src/view';
import { SwitchColors, Pull } from '~src/logic/spells';



const game = new ClientGame('#container');
game.init();

const config: MatchConfig = {
    layout: {
        players: [
            {
                board_text: {
                    origin: { x: 210, y: 500 }
                },
                board: {
                    origin: { x: 210, y: 500 }
                },
                player: {
                    origin: { x: 0, y: 0 },
                    next: { x: 670, y: 500 }
                }
            },
            {
                board_text: {
                    origin: { x: 210 + 960, y: 500 }
                },
                board: {
                    origin: { x: 210 + 960, y: 500 }
                },
                player: {
                    origin: { x: 1920 / 2, y: 1080 / 2 },
                    next: { x: 670 + 960 - 320 * 2, y: 500 }
                }
            }
        ],
        blockSize: { width: 32, height: 32 },
    },
    boardSize: { width: 10, height: 15 },
    players: [
        {
            spells: [
                Pull,
                SwitchColors
            ],
            type: 'player'
        },
        {
            spells: [
                Pull
            ],
            type: 'ai'
        }
    ],
    game: game.view,
    meta: {
        matchClass: MatchView
    },
    stage: 'mountain'
};

const match = MatchFactory.BUILD(config);
game.view.phaser.scene.add('match', match);
// game.start()
game.view.phaser.scene.start('match');

const global = <any>window;
global.match = match;
global.game = game;