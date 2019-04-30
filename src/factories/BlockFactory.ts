import { BlockView } from '~src/view/BlockView';
import { BlockLogic, ENERGIES } from '~src/logic/BlockLogic';

export class BlockFactory {
    constructor(private scene: Phaser.Scene) {

    }

    build(): BlockView {
        const energy = ENERGIES[Math.floor(Math.random() * ENERGIES.length)];
        const logic = new BlockLogic(energy, { x: 0, y: 10 });
        const view = new BlockView(logic);
        view.scene = this.scene;
        view.create();

        return view;
    }

}