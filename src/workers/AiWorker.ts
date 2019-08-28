const actions = ['moveLeft', 'moveRight', 'fall', 'rotate', 'moveDown'];

setInterval(() => {
    postMessage({
        type: "move",
        direction: actions[Math.floor(Math.random() * actions.length)]
    });
}, 100);