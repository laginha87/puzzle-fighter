import { MatchView } from 'src/view';
import { Debug } from 'debug/debug';

export class DebugMatchView extends MatchView {
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

        this.debug.update(time, delta);
    }
}