import { StageLogic } from 'src/logic';
import { SceneState } from './types';
import { BaseStageView } from './stages';

export class StageView implements SceneState {
    scene!: Phaser.Scene;

    constructor(private stage : StageLogic, private stageView: BaseStageView) {

    }

    public init() {

    }

    public preload() {
        this.stageView.preload();
    }

    public create() {
        this.stageView.create()
    }

}