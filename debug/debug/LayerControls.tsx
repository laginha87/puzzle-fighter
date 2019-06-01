import * as React from 'react';
import { FallingBlockLayer, GridLayer, BlocksLayer, BlockIdLayer } from 'debug/layers';
import { DebugMatchView } from 'debug/game/DebugMatchView';
import { BlockLayerControl } from 'debug/debug/BlockLayerControl';
import { EnergyChainLayerControl } from 'debug/debug/EnergyChainLayerControl';

interface Props {
    match: DebugMatchView;
}

export class LayerControls extends React.Component<Props> {

    render() {


        return <div>
            <BlockLayerControl name='Show Falling' match={this.props.match} layerClass={FallingBlockLayer} />
            <BlockLayerControl name='Show Grid' match={this.props.match} layerClass={GridLayer} />
            <BlockLayerControl name='Show Blocks' match={this.props.match} layerClass={BlocksLayer} />
            <BlockLayerControl name='Show Ids' match={this.props.match} layerClass={BlockIdLayer} />
            <EnergyChainLayerControl match={this.props.match} />
        </div>;
    }
}