import * as React from 'react';
import { PieceLogic } from '~src/logic';
import { DebugMatchView } from '~debug/game/DebugMatchView';

type Props = { match: DebugMatchView;  };
type State = {

    blockSpeed: number;
    pieceSpeed: number;
    paused: boolean;
}

export class SpeedControls extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.onBlockSpeedChange = this.onBlockSpeedChange.bind(this);
        this.onPieceSpeedChange = this.onPieceSpeedChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            blockSpeed: parseFloat(localStorage.getItem('blockSpeed') || '0.04'),
            pieceSpeed: parseFloat(localStorage.getItem('pieceSpeed') || '0.007'),
            paused: false
        };
    }

    render() {

        const {
            blockSpeed, pieceSpeed, paused
        } = this.state;

        return <div className='row'>
            <div className='col-4'>
                <button className='btn btn-primary' onClick={this.onClick}>{!paused ? 'Pause' : 'Play'}</button>
            </div>
            <div className='form-group col-4'>
                <div>Block Speed </div>
                <input className='form-control' type='number' onChange={this.onBlockSpeedChange} value={blockSpeed} step='0.01' />
            </div>
            <div className='form-group col-4'>
                <div>Piece Speed</div>
                <input className='form-control' type='number' onChange={this.onPieceSpeedChange} value={pieceSpeed} step='0.001' />
            </div>

        </div>;
    }

    onBlockSpeedChange(e: React.ChangeEvent<HTMLInputElement>) {
        const speed = parseFloat(e.currentTarget.value);
        this.props.match.players[0].board.logic.FALLING_BLOCK_SPEED = speed;
        localStorage.setItem('blockSpeed', speed.toString());
        this.setState({ blockSpeed: speed });
    }

    onPieceSpeedChange(e: React.ChangeEvent<HTMLInputElement>) {
        const speed = parseFloat(e.currentTarget.value);
        PieceLogic.FALLING_SPEED = speed;
        localStorage.setItem('pieceSpeed', speed.toString());
        this.setState({ pieceSpeed: speed });
    }

    onClick() {
        this.props.match.debugPaused = !this.state.paused;
        this.setState({ paused: !this.state.paused });
    }

}
