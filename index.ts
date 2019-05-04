import { ClientGame } from '~/src/game/ClientGame';
import { MatchFactory } from '~/src/factories/MatchFactory';



const game = new ClientGame('container');
game.init();
const match = MatchFactory.BUILD({ game: game.view });
game.view.phaser.scene.add('match', match);
// game.start()
game.view.phaser.scene.start('match');

window.match = match;
window.game = game;