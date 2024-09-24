function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomWithСheck(min, max, arr) {
    let check = true;
    while (check) {
        let x = random(min, max);
        let y = random(min, max);

        if (!arr.some((item) => item.x === x && item.y === y)) {
            check = false;
            return { x, y };
        }
    }
}

/* function randomWithСheck(min, max, arr) {
    let x = random(min, max);
    let y = random(min, max);
    arr.forEach((item) => {
        if (x === item.x && y === item.y) {
            const coord = randomWithСheck(min, max, arr);
            x = coord.x;
            y = coord.y;
        } else {
            return;
        }
    });
    return { x, y };
} */

randomWithСheck(1, 1000, [1, 5]);
