import { SceneState } from '~src/view';
import { LayoutConfig } from '~src/view/types';
import { PlayerLogic } from '~src/logic';
import { Spell } from '~src/logic/spells';

export class BoardTextView implements SceneState {
    public scene!: Phaser.Scene;

    constructor(private layout: LayoutConfig, private player: PlayerLogic) {
        player.events.on('cast_spell', this.castSpell.bind(this));
        player.events.on('spell:not_enough_energy', this.notEnoughEnergy.bind(this));
    }

    public init() {
    }

    public preload() {
    }

    public create() {
    }

    update(time: number, delta: number) {
    }

    castSpell(spell: Spell) {
        // Todo add back the board text

        // const { x, y } = this.layout.origin;
        // const sprite = this.scene.add.text(x, y, spell.name, {backgroundColor: 'black'});
        // spell.events.once('spell_finished', () => {
        //     sprite.destroy();
        // });
    }

    notEnoughEnergy() {
        const { x, y } = this.layout.origin;
        const sprite = this.scene.add.text(x, y, 'Not enough energy', {backgroundColor: 'black'});
        setTimeout(() => sprite.destroy(), 3000);
    }
}
