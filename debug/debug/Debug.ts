import { Updatable } from 'src/utils';
import { Layer } from '../layer';

export class Debug  implements Updatable {
    public layers : Layer[] = [];

    update(time: number, delta: number): void {
        this.layers.forEach((e) => e.update(time, delta));
    }

    create() {
        this.layers.forEach((e) => e.create());
    }

}