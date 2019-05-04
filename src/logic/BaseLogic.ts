import { Updatable } from '~src/utils';
import { Behavior } from '~/src/logic/behavior';

export class BaseLogic implements Updatable {
    private behaviors: Behavior[] = [];

    update(time: number, delta: number) {
        this.behaviors.forEach(e => e.update(time, delta));
    }
}
