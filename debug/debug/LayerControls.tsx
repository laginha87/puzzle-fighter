import * as React from 'react';

type State = {
    showGrid: boolean,
    showBlocks: boolean,
    showFalling: boolean,
}

export class LayerControls extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            showGrid: true,
            showBlocks: true,
            showFalling: true
        }
    }

    render() {
        const { showGrid, showBlocks, showFalling } = this.state;

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
        </div>;
    }
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const prop = e.currentTarget.getAttribute('data-prop') as 'showGrid' | 'showFalling' | 'showBlocks';
        const newValue = !((this.state as any)[prop]);
        const layer = window.debug.layers.filter((e) => e.name === 'BlockLayer')[0];
        layer[prop] = newValue;
        this.setState({ [prop]: newValue });
    }
}