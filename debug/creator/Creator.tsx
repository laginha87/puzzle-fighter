import * as React from 'react';
import { BlockLogic, BoardLogic } from 'src/logic';
import { BlockGrid } from 'debug/creator/BlockGrid';
import { serializeBoard } from 'src/serializeBoard';


interface State {
    blocks: (BlockLogic| null)[][];
}

const width = 10;
const height = 10;

export class Creator extends React.Component<any, State>{
    textArea: any;

    constructor(props: any){
        super(props);


        let blocks = [];
        for (let x = 0; x < width; x++) {
            blocks[x] = Array(height)
                .fill(null);
        }
        this.state = {
            blocks,
        };

        this.onBlockAdded = this.onBlockAdded.bind(this);
        this.onBlockRemoved = this.onBlockRemoved.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    copyToClipboard(e : any) {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
    }

    render() {


        const board = new BoardLogic({width, height});
        board.blocks = this.state.blocks.reduce((acc, e) => ({...acc, ...e.filter(ee => ee !== null)
            .reduce((acc2, ee)=> ({...acc2, [ee!.id]: ee}), {})}), {});

        const serializedBoard = serializeBoard(board);

        return <div>
            <BlockGrid grid={this.state.blocks} addBlock={this.onBlockAdded} removeBlock={this.onBlockRemoved}/>
            <div>
            <textarea
            // tslint:disable-next-line: react-this-binding-issue
            ref={(textarea) => this.textArea = textarea}
            value={serializedBoard}
          />
                <button className='btn btn-primary' onClick={this.copyToClipboard}>copy</button>
            </div>
        </div>;
    }

    onBlockAdded(block : BlockLogic) {
        this.state.blocks[block.position.x][block.position.y] = block;
        this.setState({blocks: [...this.state.blocks]});
    }

    onBlockRemoved(x : number, y : number) {
        this.state.blocks[x][y] = null;
        this.setState({blocks: [...this.state.blocks]});
    }
}
