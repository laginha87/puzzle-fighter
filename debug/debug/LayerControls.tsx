import * as React from 'react';
import { FallingBlockLayer,GridLayer, BlocksLayer, BlockIdLayer } from 'debug/layers';
import { DebugMatchView } from 'debug/game/DebugMatchView';
import { BlockLayerControl } from 'debug/debug/BlockLayerControl';

interface Props {
    match: DebugMatchView;
}

export class LayerControls extends React.Component<Props> {
    gridLayer: GridLayer;
    fallingLayer: FallingBlockLayer;
    blocksLayer: BlocksLayer;
    blockIdLayer: BlockIdLayer;

    constructor(props: Props) {
        super(props);
        this.gridLayer = new GridLayer(props.match);
        this.fallingLayer = new FallingBlockLayer(props.match);
        this.blocksLayer = new BlocksLayer(props.match);
        this.blockIdLayer = new BlockIdLayer(props.match);
    }
    componentDidMount() {
        // setInterval(() => {
        //     const layer = (window.debug.layers.filter((e) => e.name === 'BlockLayer')[0]) as BlockLayer;
        //     this.setState({ boardState: getState(), chains: layer.chains, showChains: layer.showChains });
        // }, 100);
    }

    render() {


        return <div>
            <BlockLayerControl name='Show Falling' match={this.props.match} layer={this.fallingLayer}  />
            <BlockLayerControl name='Show Grid' match={this.props.match} layer={this.gridLayer} />
            <BlockLayerControl name='Show Blocks' match={this.props.match} layer={this.blocksLayer} />
            <BlockLayerControl name='Show Ids' match={this.props.match} layer={this.blockIdLayer} />
        </div>;
    }
}