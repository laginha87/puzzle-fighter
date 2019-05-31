import { MatchView } from 'src/view';
import { Debug } from 'debug/debug';
import { BlockLayer } from 'debug/layer';

export class DebugMatchView extends MatchView {
    debugCreated = false;
    debugPaused = false;
    debug: Debug;

    constructor(config: string | Phaser.Scenes.Settings.Config) {
        super(config);
        this.debug = new Debug();
    }

    update(time: number, delta: number) {
        if (!this.debugPaused) {
            super.update(time, delta);
        }
        if (!this.debugCreated) {
            this.debug.create();
            this.debugCreated = true;
        }
        this.debug.update(time, delta);
    }
}