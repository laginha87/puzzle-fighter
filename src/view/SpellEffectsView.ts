import { SceneState } from 'src/view';
import { LayoutConfig } from 'src/view/types';
import { PlayerLogic } from 'src/logic';
import { Spell } from 'src/logic/spells';

export class SpellEffectsView implements SceneState {
    public scene!: Phaser.Scene;

    constructor(private layout: LayoutConfig, private player: PlayerLogic) {
        player.events.on('cast_spell', this.castSpell.bind(this));
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
        const { x, y } = this.layout.origin;
        const sprite = this.scene.add.text(x, y, spell.name);
        spell.events.once('spell_finished', () => {
            sprite.destroy();
        });
    }
}
