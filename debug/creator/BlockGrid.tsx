import * as  React from 'react';
import { BlockLogic, EnergyType, ENERGIES, Type, BLOCK_TYPES } from '~src/logic';

interface Props {
    grid: (BlockLogic | null)[][];
    removeBlock: (x : number, y: number) => void;
    addBlock: (block : BlockLogic) => void;
}

interface State {
    energy_type: EnergyType;
    type:  Type;
}

export class BlockGrid extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);

        this.state = {
            energy_type: 'chaos',
            type: 'regular'
        };
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onEnergyTypeChange = this.onEnergyTypeChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    render(){
        return <div>
        <div className='row'>
            <div className='col-6 d-flex'>
                {this.props.grid.map((e, x) => (<div className='d-flex flex-column'>
                    {e.map((ee , y) => {
                        const blockClass = ee ? `${ee.type}_${ee.energy_type}` : 'empty';

                        return <div className={`border block ${blockClass} d-inline-block`} onClick={this.onClick} data-x={x} data-y={y}></div>;
                        })}
                </div>))}
            </div>
            <div className='col-6'>
                <select onChange={this.onEnergyTypeChange}>
                    {ENERGIES.map((e : EnergyType) => (<option value={e}>{e}</option>))}
                </select>

                <select onChange={this.onTypeChange}>
                    {BLOCK_TYPES.map((e : Type) => (<option value={e}>{e}</option>))}
                </select>

            </div>
        </div>
        </div>;
    }

    onEnergyTypeChange(e : React.ChangeEvent<any>) {
        this.setState({energy_type: e.target.value });
    }

    onTypeChange(e : React.ChangeEvent<any>) {
        this.setState({type: e.currentTarget.value as Type});
    }

    onClick(e: React.MouseEvent<any>) {
        const x = e.currentTarget.getAttribute('data-x') as unknown as number;
        const y = e.currentTarget.getAttribute('data-y') as unknown  as number;

        if(this.props.grid[x][y]){
            this.props.removeBlock(x, y);
        } else {
            const block = new BlockLogic(this.state.energy_type, {x,y}, this.state.type, x * 10 + y);
            this.props.addBlock(block);
        }

    }
}