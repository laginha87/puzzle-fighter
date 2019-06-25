import * as React from 'react';
import { ClientGame } from 'src/game/ClientGame';
import { DiffScene } from 'debug/diff/DiffScene';
import { unserializeBoard } from 'src/serializeBoard';
import { BoardView } from 'src/view';


export class Diff extends React.Component{
    componentDidMount() {
        const game = new ClientGame('#container');
        game.init();
        const diff = new DiffScene({});
        const logic = unserializeBoard('10:10|1:9:w:b|2:4:c:r|4:10:n:e');
        diff.view = new BoardView(logic, {
            blockSize: {
                width: 32,
                height: 32
            },
            origin: {
                x: 40,
                y: 40
            }
        });

        diff.view.scene = diff;

        game.view.phaser.scene.add('diff', diff);
        game.view.phaser.scene.start('diff');
    }

    render() {
        return <div className='row'>
            <div className='col-7'>
                <div id='container'></div>
            </div>

        </div>;
    }
}
