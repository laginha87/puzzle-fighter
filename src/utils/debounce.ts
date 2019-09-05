export const debounce = (callback : () => void, wait : number) => {
    let called = false;
    let total = 0 ;

    return (time : number, delta: number) => {
        total += delta;
        console.log(total);
        console.log(total >= wait);
        if(!called) {
            callback();
            called = true;
        }

        return total >= wait;
    };
};