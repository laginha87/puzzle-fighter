import { Updatable } from '~src/utils';

export interface IBehavior extends Updatable {
    key: string;
    parent: any;
}

export interface HasBehaviors extends Updatable {
    behavior: Behavior;
}

export class Behavior implements Updatable {
    behaviors = <IBehavior[]>[];

    constructor(private parent) {
    }

    add(key: string, behavior: IBehavior) {
        behavior.key = key;
        behavior.parent = this.parent;
        this.behaviors.push(behavior);
    }

    remove(key: string) {
        this.behaviors = this.behaviors.filter(({ key: k }) => k == key);
    }

    update(time: number, delta: number): void {
        this.behaviors.forEach(e => e.update(time, delta));
    }
}