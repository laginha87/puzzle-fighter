import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { LayerControls, SpeedControls, SessionControls } from 'debug/debug';
import { ClientGame } from 'src/game/ClientGame';
import { MatchFactory } from 'src/factories';
import { DebugMatchView } from 'debug/game/DebugMatchView';

interface State {
    game?: ClientGame;
    match?: DebugMatchView;
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            game: undefined,
            match: undefined
        };
    }

    componentDidMount() {
        const game = new ClientGame('#container');
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
            game: game.view,
            meta: {
                matchClass: DebugMatchView
            }
        };
        const match = MatchFactory.BUILD(config) as DebugMatchView;
        game.view.phaser.scene.add('match', match);
        game.view.phaser.scene.start('match');
        this.setState({ game, match });
    }

    render() {
        return <div className='row'>
            <div className='col-7'>
                <div id="container"></div>
            </div>
            {this.state.match && <div className='col-5'>
                <SpeedControls />
                <LayerControls match={this.state.match} />
                <SessionControls />
            </div>}

        </div>;
    }
}




ReactDOM.render(<App />, document.getElementById('app'));