import * as React from 'react';
import { ClientGame } from 'src/game/ClientGame';
import { DiffScene } from 'debug/diff/DiffScene';
import { unserializeBoard } from 'src/serializeBoard';
import { BoardView } from 'src/view';
import * as queryString from 'query-string';


export class Diff extends React.Component{
    componentDidMount() {
        const game = new ClientGame('#container');
        game.init();
        const diff = new DiffScene({});

        const values = queryString.parse(location.search);
        const logic1 = unserializeBoard(values.b1 as string);

        diff.boards = [
            new BoardView(logic1, {
                blockSize: {
                    width: 32,
                    height: 32
                },
                origin: {
                    x: 40,
                    y: 40
                }
            }),

        ];

        if(values.b2) {
            const logic2 = unserializeBoard(values.b2 as string);
            diff.boards.push(new BoardView(logic2, {
                blockSize: {
                    width: 32,
                    height: 32
                },
                origin: {
                    x: 400,
                    y: 40
                }
            }));
        }

        diff.boards.forEach((e) => e.scene = diff);

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
