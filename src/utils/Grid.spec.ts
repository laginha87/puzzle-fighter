import { Grid } from '~src/utils/Grid';

let ID = 0;

const g = (width=10, height=15) => (new Grid({width, height}));
const e = (x :number,y :number,id=ID++) => ({position: {x,y}, id});

describe('Grid', () => {
    test('constructor', () => {
        const grid = g();

        expect(grid.cols.length)
            .toEqual(15);

        expect(grid.rows.length)
            .toEqual(10);

        expect(grid.rows[0].length)
            .toEqual(15);
        expect(grid.cols[0].length)
            .toEqual(10);
    });

    describe('add', () => {
        test('normal elements', () => {
            const grid = g();
            const el = e(9, 10, 0);
            const secondEl = e(3, 2, 1);

            grid.add(el);
            grid.add(secondEl);

            expect(grid.byId[0])
                .toBe(el);
            expect(grid.rows[9][10])
                .toEqual(0);
            expect(grid.cols[10][9])
                .toEqual(0);

            expect(grid.byId[1])
                .toBe(secondEl);
            expect(grid.rows[3][2])
                .toEqual(1);
            expect(grid.cols[2][3])
                .toEqual(1);

        });

        test('floaty numbers', () => {
            const grid = g();
            const el = e(8.2, 10.9, 20);

            grid.add(el);

            expect(grid.byId[20])
                .toBe(el);

            expect(grid.rows[8][11])
                .toBe(20);

            expect(grid.cols[11][8])
                .toBe(20);
        });
    });

    describe('remove', () => {
        test('normal elements', () => {
            const grid = g();
            const el = e(9, 10, 0);
            const secondEl = e(3, 2, 1);

            grid.add(el);
            grid.add(secondEl);

            grid.remove(el);
            grid.remove(secondEl);

            expect(grid.byId[0])
                .toBe(null);
            expect(grid.rows[9][10])
                .toEqual(null);
            expect(grid.cols[10][9])
                .toEqual(null);

            expect(grid.byId[1])
                .toBe(null);
            expect(grid.rows[3][2])
                .toEqual(null);
            expect(grid.cols[2][3])
                .toEqual(null);

        });

        test('floaty numbers', () => {
            const grid = g();
            const el = e(8.2, 10.9, 20);

            grid.add(el);
            grid.remove(el);

            expect(grid.byId[20])
                .toBe(null);

            expect(grid.rows[8][11])
                .toBe(null);

            expect(grid.cols[11][8])
                .toBe(null);
        });
    });
});
