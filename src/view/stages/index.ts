import { SceneState } from 'src/view/types';

export interface BaseStageView extends SceneState {
    preload() : void;
    init(): void;
    create(): void;
}