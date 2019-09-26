export const wait = (wait : number) => {
    let total = 0 ;

    return (time : number, delta: number) => {
        total += delta;

        return total >= wait;
    };
};