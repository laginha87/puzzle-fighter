import { SceneState } from '~src/view';
import { BlockLogic } from '~src/logic';


export class BlockView implements SceneState {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    constructor(private logic: BlockLogic) { }

    create() {
        const { x, y } = this.logic;
        this.sprite = this.scene.add.sprite(x, y, 'blocks', `regular_${this.logic.energy_type}.ase`);
        this.sprite.setOrigin(0, 0);
    }

    setPosition(x: number, y: number) {
        this.sprite.setPosition(x, y);
    }

    update(time: number, delta: number) {
        const { x, y } = this.logic;
        this.sprite.setPosition(x, y);
    }


}