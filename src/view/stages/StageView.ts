import { SceneState } from '~src/view/types';
import { MatchView } from '~src/view';
import { Updatable } from '~src/utils';
import { StageLogic } from '~src/logic/stages';
import { Size } from '~src/types';

interface Config {
    blockSize: Size;
}
export abstract class StageView implements SceneState, Updatable {
    constructor(public scene: MatchView, protected logic: StageLogic, protected config : Config) {

    }
    abstract preload() : void;
    abstract init(): void;
    abstract create(): void;
    abstract update(time: number, delta: number): void;
}