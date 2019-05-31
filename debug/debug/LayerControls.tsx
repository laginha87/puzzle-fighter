import * as React from 'react';
import { FallingBlockLayerControl } from 'debug/layers';
import { DebugMatchView } from 'debug/game/DebugMatchView';

interface Props {
    match: DebugMatchView;
}

export class LayerControls extends React.Component<Props> {

    componentDidMount() {
        // setInterval(() => {
        //     const layer = (window.debug.layers.filter((e) => e.name === 'BlockLayer')[0]) as BlockLayer;
        //     this.setState({ boardState: getState(), chains: layer.chains, showChains: layer.showChains });
        // }, 100);
    }

    render() {


        return <div>
            <FallingBlockLayerControl match={this.props.match} />

            {/* <div className='form-check'>
                <label className='form-check-label'>
                    <input type='checkbox' className='form-check-input' data-prop='showGrid' checked={showGrid} onChange={this.onChange} />
                    Show Grid
                </label>
            </div>
            <div className='form-check'>
                <label className='form-check-label'>
                    <input type='checkbox' className='form-check-input' data-prop='showBlocks' checked={showBlocks} onChange={this.onChange} />
                    Show Blocks
                </label>
            </div>
            <div className='form-check'>
                <label className='form-check-label'>
                    <input type='checkbox' className='form-check-input' data-prop='showFalling' checked={showFalling} onChange={this.onChange} />
                    Show Falling
                </label>
            </div>

            <div className='form-check'>
                <label className='form-check-label'>
                    <input type='checkbox' className='form-check-input' data-prop='showNumbers' checked={showNumbers} onChange={this.onChange} />
                    Show Falling
                </label>
            </div>

            <div>{boardState}</div> */}

        </div>;
    }
    // onChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     const prop = e.currentTarget.getAttribute('data-prop') as 'showGrid' | 'showFalling' | 'showBlocks';
    //     const value = !((this.state as any)[prop]);
    //     this.setValue(prop, value);
    //     this.setState({ [prop]: value });
    // }

    // setValue(prop: 'showGrid' | 'showFalling' | 'showBlocks', value) {
    //     const layer = window.debug.layers.filter((e) => e.name === 'BlockLayer')[0];
    //     localStorage.setItem(prop, JSON.stringify(value));
    //     layer[prop] = value;
    // }
}