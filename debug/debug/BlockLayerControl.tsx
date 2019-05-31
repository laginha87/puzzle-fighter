import * as React from 'react';
import { DebugMatchView } from 'debug/game/DebugMatchView';
import { BlockLayer } from 'debug/layers';

interface Props {
    match: DebugMatchView;
    layer: BlockLayer;
    name: string;
}

interface State {
    showing: boolean;
};


export class BlockLayerControl extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        props.match.debug.layers.push(props.layer);
        setTimeout(() => this.props.layer.create(), 500);
        this.state = {
            showing: props.layer.showing
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
                        checked={showing}
                        onChange={this.onChange} />
                    {this.props.name}
            </label>
        </div>;
    }

    onChange() {
        const showing = !this.state.showing;
        this.props.layer.showing = showing;
        localStorage.setItem('', JSON.stringify(showing));
        this.setState({ showing });
    }
}