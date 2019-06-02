import * as React from 'react';
import { SpellManager } from 'src/logic/board_managers';
import { SwitchColors } from 'src/logic/spells';
import { PlayerLogic } from 'src/logic';
import { MatchView } from 'src/view';
import { NumberInputComponent, Col } from 'debug/components';

interface Props {
    match: MatchView;
}
interface State {
    level: number;
}

export class SpellControls extends React.Component<Props, State> {
    spellManager: SpellManager;
    player: PlayerLogic;

    constructor(props: Props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.player = props.match.players[0].logic;
        this.spellManager = this.player.board.managers.spells;
        this.setLevel = this.setLevel.bind(this);
    }

    render() {

        return <div className='card mt-2'>
            <div className='card-body'>
                <h5>Spells</h5>
                <Col size={2}>
                    <NumberInputComponent min={1} max={5} onChange={this.setLevel} label='Level' />
                </Col>
                <button
                    className='btn btn-outline-primary'
                    onClick={this.onClick}>
                    Cast
                </button>
            </div>
        </div>;
    }

    onClick() {
        const { level } = this.state;
        this.spellManager.cast(new SwitchColors({
            level,
            adversary: this.player,
            owner: this.player
        }));
    }

    setLevel(level: number) {
        this.setState({ level });
    }
}