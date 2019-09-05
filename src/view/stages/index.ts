import { StageMap } from 'src/logic/stages';
import { StageView } from 'src/view/stages/StageView';
import { MountainStageView } from 'src/view/stages/MountainStageView';
import { Type } from 'src/utils';

// tslint:disable-next-line: export-name
export { StageView } from 'src/view/stages/StageView';

// tslint:disable-next-line: export-name
export const STAGE_VIEWS : StageMap<Type<StageView>>= {
    'mountain': MountainStageView
};