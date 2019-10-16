export function updateWhile(updateable, cond : () => boolean) {
    let totalTime = 0;
    while(cond()) {
        let delta = Math.floor(Math.random() * 10) + 30;
        updateable.update(totalTime, delta);
        totalTime += delta;
    }
}