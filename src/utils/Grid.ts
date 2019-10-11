import { Size, Position } from '~src/types';

interface Griddable {
    position: Position;
    id: number;
}

export class Grid<K extends Griddable> {
    public readonly cols: (integer | null)[][];
    public readonly rows: (integer | null)[][];
    public readonly byId: { [k in number]: K | null };

    constructor(size : Size) {
        this.rows = Array(size.width)
            .fill(null)
            .map(() => Array(size.height)
                .fill(null)
            );

        this.cols = Array(size.height)
            .fill(null)
            .map(() => Array(size.width)
                .fill(null)
            );

        this.byId = {};
    }

    add(el : K) {
        const { position: { x, y }, id } = el;
        const newX = Math.round(x);
        const newY = Math.round(y);

        this.byId[el.id] = el;
        this.rows[newX][newY] = id;
        this.cols[newY][newX] = id;
    }

    remove(el : K) {
        const { position: { x, y }, id } = el;
        const newX = Math.round(x);
        const newY = Math.round(y);

        this.byId[el.id] = null;
        this.rows[newX][newY] = null;
        this.cols[newY][newX] = null;
    }


}