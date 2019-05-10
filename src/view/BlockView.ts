import { SceneState } from 'src/view';
import { BlockLogic } from 'src/logic';
import { Size } from 'src/types';


export class BlockView implements SceneState {
    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;

    constructor(private logic: BlockLogic, public size : Size) { }

    create() {
        const { x, y } = this.logic.position;
        this.sprite = this.scene.add.sprite(x, y, 'blocks', `${this.logic.type}_${this.logic.energy_type}.ase`);
        this.sprite.setOrigin(0, 0);
    }

    setPosition(x: number, y: number) {
        this.sprite.setPosition(x, y);
    }

    update(time: number, delta: number) {
        this.refresh();
    }

    refresh() {
        const { x, y } = this.logic.position;
        const { width, height } = this.size;
        this.sprite.setPosition(x * width, y * height);
    }


}