import { SceneState } from '~src/view';
import { BlockLogic } from '~src/logic';
import { Size } from '~src/types';


export class BlockView implements SceneState {
    scene!: Phaser.Scene;
    sprite!: Phaser.GameObjects.Sprite;

    constructor(private logic: BlockLogic, public size : Size) { }

    create() {
        this.createSprite();
        this.logic.view = this;
    }


    private createSprite() {
        const { x, y } = this.logic.position;
        this.sprite = this.scene.add.sprite(x, y, 'blocks', `${this.logic.type}_${this.logic.energy_type}.ase`);
        this.sprite.setOrigin(0, 0);
    }

    get spriteName(){
        return `${this.logic.type}_${this.logic.energy_type}.ase`;
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

    refreshAll(){
        const container = this.sprite.parentContainer;
        this.sprite.destroy();
        this.createSprite();
        container.add(this.sprite);
    }

}