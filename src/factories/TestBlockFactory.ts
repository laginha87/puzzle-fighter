import { BlockFactory } from '~src/factories/BlockFactory';
import { EnergyType, BlockLogic } from '~src/logic';
import { ENERGY_MAP, TYPE_MAP } from '~src/serializeBoard';

export class TestBlockFactory extends BlockFactory {
    protected id = 1000;
    public finished = false;
    public energyPool : EnergyType[] = [];
    private blocks : BlockLogic[];
    constructor(template : String) {
        super();
        this.blocks = template
            .split('|')
            .map(e => {
                const [energy_type, type] = e.split(':');

                return new BlockLogic(
                    ENERGY_MAP[energy_type],
                    {x:0, y:0},
                    TYPE_MAP[type],
                    this.id++
                );
        });
    }

    build() : BlockLogic {
        if(this.blocks.length === 0 ) {
            this.finished = true;

            return super.build();
        } else {
            return this.blocks.shift()!;
        }
    }

    buildPiece() {
        const blocks = this.buildN(2);
        blocks.forEach((e,i)=> e.position.y = i);

        return blocks;
    }
}