import { Updatable } from 'src/utils';
import { MatchView } from 'src/view';

export class Layer implements Updatable {
    public name!: string;
    public created : boolean = false;

    constructor(protected match: MatchView) {

    }
    update(time: number, delta: number): void {
    }

    create() {

    }
}