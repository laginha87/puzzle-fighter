import { SceneState } from '~/src/view/Types';
import { BlockLogic } from '~src/logic/BlockLogic';


export class BlockView implements SceneState {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    constructor(private logic : BlockLogic) { }

    create() {
        const { x, y } = this.logic;
        this.sprite = this.scene.add.sprite(x, y, 'blocks', `regular_${this.logic.energy_type}.ase`);
    }

    update(time: number, delta: number) {
        const { x, y } = this.logic;
        this.sprite.setPosition(x, y);
    }


}