import { Updatable } from '~src/utils';
import { Layer } from 'debug/layers';

export class Debug  implements Updatable {
    public layers : Layer[] = [];

    update(time: number, delta: number): void {
        this.layers.filter(e => e.created).forEach((e) => e.update(time, delta));
    }

    create() {
        this.layers.forEach((e) => e.create());
    }

}