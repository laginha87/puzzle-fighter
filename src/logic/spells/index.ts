import { Pull } from '~src/logic/spells/Pull';
import { MetaSpell } from '~src/logic/spells/Spell';
import { SwitchColors } from '~src/logic/spells/SwitchColors';

export * from './Spell';
export * from './SpellFactory';
export { SwitchColors } from '~src/logic/spells/SwitchColors';
export { Pull } from '~src/logic/spells/Pull';
const index = [
    Pull,
    SwitchColors
];

export type SpellName = 'pull'|'switch-colors';

export type StageMap<K> = { [k in SpellName]: K };

// tslint:disable-next-line: export-name
export const SPELL_LOGICS : StageMap<MetaSpell> = {
    'pull': Pull,
    'switch-colors': SwitchColors
};


export default index;