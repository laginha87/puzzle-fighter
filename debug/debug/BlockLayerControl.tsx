import * as React from 'react';
import { DebugMatchView } from 'debug/game/DebugMatchView';
import { Layer } from 'debug/layers';
import { MatchView } from 'src/view';


interface ILayerClass {
    new (match : MatchView): ShowableLayer;
}

interface ShowableLayer extends Layer {
    showing: boolean;
}

interface Props {
    match: DebugMatchView;
    layerClass: ILayerClass;
    name: string;
}

interface State {
    showing: boolean;
};


export class BlockLayerControl extends React.Component<Props, State> {
    layer : ShowableLayer;

    constructor(props: Props) {
        super(props);
        this.layer = new props.layerClass(props.match);
        this.layer.showing = JSON.parse(localStorage.getItem(this.layerLocalStorageKey) || 'false');
        props.match.debug.layers.push(this.layer);
        setTimeout(() => this.layer.create(), 2000);
        this.state = {
            showing: this.layer.showing
        };

        this.onChange = this.onChange.bind(this);
    }

    get layerLocalStorageKey() {
        return `show${this.layer.name}`;
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
        this.layer.showing = showing;
        localStorage.setItem(this.layerLocalStorageKey, JSON.stringify(showing));
        this.setState({ showing });
    }
}