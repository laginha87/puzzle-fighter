import { SceneState } from 'src/view/types';
import { MatchView } from 'src/view';
import { Updatable } from 'src/utils';
import { StageLogic } from 'src/logic/stages';

export abstract class StageView implements SceneState, Updatable {
    constructor(public scene: MatchView, private logic: StageLogic) {

    }
    abstract preload() : void;
    abstract init(): void;
    abstract create(): void;
    abstract update(time: number, delta: number): void;
}