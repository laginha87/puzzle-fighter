import * as React from 'react';
import { MatchView } from 'src/view';
import { BoardManagerName } from 'src/logic';
import { EnergyChain } from '~src/logic/board_managers';
import { BlockLayer } from '~debug/layer';

type State = {
    showGrid: boolean,
    showBlocks: boolean,
    showFalling: boolean,
    boardState: BoardManagerName,
    chains: EnergyChain[],
    showChains: boolean[]
}


const getState = () => window.match && (window.match as MatchView).logic.players[0].board.activeManager;

export class LayerControls extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            showGrid: JSON.parse(localStorage.getItem('showGrid') || 'true'),
            showBlocks: JSON.parse(localStorage.getItem('showBlocks') || 'true'),
            showFalling: JSON.parse(localStorage.getItem('showFalling') || 'true'),
            boardState: getState(),
            chains: [],
            showChains: [],
        };
    }

    componentDidMount() {
        setInterval(() => {
            const layer = (window.debug.layers.filter((e) => e.name === 'BlockLayer')[0]) as BlockLayer;
            this.setState({ boardState: getState(), chains: layer.chains, showChains: layer.showChains });
        }, 100);

        this.setValue('showGrid', this.state.showGrid);
        this.setValue('showBlocks', this.state.showBlocks);
        this.setValue('showFalling', this.state.showFalling);
    }

    render() {
        const { showGrid, showBlocks, showFalling, boardState, chains, showChains } = this.state;


        return <div>
            <div className='form-check'>
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
                    <input type='checkbox' className='form-check-input' data-prop='showFalling' checked={showFalling} onChange={this.onChange} />
                    Show Falling
                </label>
            </div>

            <div>{boardState}</div>

        </div>;
    }
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const prop = e.currentTarget.getAttribute('data-prop') as 'showGrid' | 'showFalling' | 'showBlocks';
        const value = !((this.state as any)[prop]);
        this.setValue(prop, value);
        this.setState({ [prop]: value });
    }

    setValue(prop: 'showGrid' | 'showFalling' | 'showBlocks', value) {
        const layer = window.debug.layers.filter((e) => e.name === 'BlockLayer')[0];
        localStorage.setItem(prop, JSON.stringify(value));
        layer[prop] = value;
    }
}