import * as React from 'react';
import { SpellManager } from 'src/logic/board_managers';
import { SwitchColors } from 'src/logic/spells';
import { PlayerLogic } from 'src/logic';
import { MatchView } from 'src/view';

interface Props {
    match: MatchView;
}

export class SpellControls extends React.Component<Props> {
    spellManager : SpellManager;
    player: PlayerLogic;

    constructor(props : Props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.player = props.match.players[0].logic;
        this.spellManager = this.player.board.managers.spells;
    }

    render() {


        return <div className='card mt-2'>
            <div className='card-body'>
                <h5>Spells</h5>
                <button
                    className='btn btn-outline-primary'
                    onClick={this.onClick}>
                    Cast
                </button>
            </div>
        </div>;
    }

    onClick() {
        this.spellManager.cast(new SwitchColors({
            level: 3,
            adversary: this.player,
            owner: this.player
        }));
    }
}