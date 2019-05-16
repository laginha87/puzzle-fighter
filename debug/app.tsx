import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Phaser } from 'debug/Phaser';
import { LayerControls, SpeedControls, SessionControls } from 'debug/debug';

class App extends React.Component {

    render() {
        return <div className='row'>
            <div id='container' className='col-7'>
                <Phaser />
            </div>
            <div className='col-5'>
                <SpeedControls />
                <LayerControls />
                <SessionControls />
            </div>

        </div>;
    }
}




ReactDOM.render(<App />, document.getElementById('app'));