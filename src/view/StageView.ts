import { StageLogic } from 'src/logic';
import { SceneState } from 'src/view/types';
import { BaseStageView } from 'src/view/stages';
import { Updatable } from 'src/utils';

export class StageView implements SceneState, Updatable {
    scene!: Phaser.Scene;

    constructor(private stage : StageLogic, private stageView: BaseStageView) {

    }

    public init() {
        this.stageView.init();
    }

    public preload() {
        this.stageView.preload();
    }

    public create() {
        this.stageView.create()
    }

    update(time: number, delta: number): void {
        this.stageView.update(time, delta);
    }
}