import * as React from 'react';
import { BlockLayer } from 'debug/layers';
import { DebugMatchView } from 'debug/game/DebugMatchView';

interface Props {
    match: DebugMatchView;
}

interface State {
    showing: boolean;
};

class FallingBlockLayer extends BlockLayer {
    name = 'FallingBlockLayer';
    showing = JSON.parse(localStorage.getItem('showFalling') || 'true');
    update() {
        this.graphics.clear();
        if (!this.showing) { return; }
        // tslint:disable-next-line: no-string-literal
        this.board.managers.falling['fallingBlocks'].forEach((b) => {
            this.drawBlock(b, 0xff0000);
        });
    }
}

export class FallingBlockLayerControl extends React.Component<Props, State> {
    layer: FallingBlockLayer;

    constructor(props: Props) {
        super(props);
        this.layer = new FallingBlockLayer(props.match);
        props.match.debug.layers.push(this.layer);
        setTimeout(() => this.layer.create(), 500);
        this.state = {
            showing: this.layer.showing
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { showing } = this.state;

        return <div className='form-check'>
                <label className='form-check-label'>
                    <input
                        type='checkbox'
                        className='form-check-input'
                        data-prop='showFalling'
                        checked={showing}
                        onChange={this.onChange} />
                    Show Falling
            </label>
        </div>;
    }

    onChange() {
        const showing = !this.state.showing;
        this.layer.showing = showing;
        localStorage.setItem('', JSON.stringify(showing));
        this.setState({ showing });
    }
}