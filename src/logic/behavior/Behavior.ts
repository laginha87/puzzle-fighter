import { Updatable } from '~src/utils';

export interface IBehavior<T> extends Updatable {
    key: string;
    parent: T;
}

export interface HasBehaviors<T> extends Updatable {
    behavior: Behavior<T>;
}

export class Behavior<T> implements Updatable {
    behaviors = <IBehavior<T>[]>[];



    add(key: string, behavior: IBehavior<T>) {
        behavior.key = key;
        this.behaviors.push(behavior);
    }

    remove(key: string) {
        this.behaviors = this.behaviors.filter(({ key: k }) => k == key);
    }

    update(time: number, delta: number): void {
        this.behaviors.forEach(e => e.update(time, delta));
    }
}