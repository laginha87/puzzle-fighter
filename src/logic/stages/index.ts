import { MountainStageLogic } from '~src/logic/stages/MountainStageLogic';
import { StageLogic } from '~src/logic/stages/StageLogic';
import { Type } from '~src/utils';

// tslint:disable-next-line: export-name
export { StageLogic } from '~src/logic/stages/StageLogic';

export type StageName = 'mountain';

export type StageMap<K> = { [k in StageName]: K };

// tslint:disable-next-line: export-name
export const STAGE_LOGICS : StageMap<Type<StageLogic>> = {
    'mountain': MountainStageLogic
};