import * as React from 'react';
import { DebugMatchView } from 'debug/game/DebugMatchView';
import { EnergyChainLayer } from 'debug/layers';
import { EnergyChain } from '~src/logic/board_managers';

interface Props {
    match: DebugMatchView;
}

interface State {
    chains: Set<EnergyChain>;
};


export class EnergyChainLayerControl extends React.Component<Props, State> {
    layer: EnergyChainLayer;
    constructor(props: Props) {
        super(props);

        this.layer = new EnergyChainLayer(props.match);

        props.match.debug.layers.push(this.layer);
        setTimeout(() => this.layer.create(), 2000);
        this.state = {
            chains: new Set()
        };

    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ chains: this.layer.board.managers.spells['energyChains'] })
        }, 100);
    }

    render() {
        const { chains } = this.state;

        return <div>
            <ul>
                {Array.from(chains)
                    .map((e) => (<li>{Array.from(e)
                        .join(',')}</li>))}
            </ul>

        </div>;
    }

    // onChange() {
    //     const showing = !this.state.showing;
    //     this.props.layer.showing = showing;
    //     localStorage.setItem(this.layerLocalStorageKey, JSON.stringify(showing));
    //     this.setState({ showing });
    // }
}