// eslint-disable-next-line no-unused-vars
class Snake {
    constructor(x, y, params, audio) {
        this.startX = x;
        this.startY = y;
        this.coord = [
            { x: x + 1, y: y },
            { x: x, y: y },
        ];
        this.currentDir = '';
        this.params = params;
        this.audio = audio;
        this.isAlive = true;
    }

    draw() {
        //console.log('draw snake: ', this.coord);
        const allCells = document.querySelectorAll('.field__cell');
        Array.prototype.forEach.call(allCells, (cell) => {
            cell.classList.remove('head');
            cell.classList.remove('tail');
        });

        this.coord.forEach((coord) => {
            const tail = document.querySelector(`[data-x="${coord.x}"][data-y="${coord.y}"]`);
            tail.classList.add('tail');
        });

        const head = document.querySelector(
            `[data-x="${this.coord[0].x}"][data-y="${this.coord[0].y}"]`
        );
        head.classList.remove('tail');
        head.classList.add('head');
    }

    eat(x, y) {
        this.coord.push({ x: x, y: y });
        this.audio.pointSound.currentTime = 0;
        this.audio.pointSound.play();
    }

    death() {
        console.log('Game over! Snake collided with itself.');
        this.isAlive = false;
        this.audio.hitSound.currentTime = 0;
        this.audio.hitSound.play();
    }

    move(dir) {
        const params = this.params;
        let newHead = {
            x: this.coord[0].x,
            y: this.coord[0].y,
        };

        newHead.x = newHead.x === params[dir].endX ? params[dir].start : newHead.x + params[dir].dX;
        newHead.y = newHead.y === params[dir].endY ? params[dir].start : newHead.y + params[dir].dY;

        this.currentDir = dir;
        this.coord.unshift(newHead);
        this.coord.pop();
        this.draw();
    }

    checkDir(dir) {
        return (
            dir in this.params &&
            this.currentDir !== dir &&
            this.currentDir !== this.params[dir].next
        );
    }

    reset() {
        this.coord = [
            { x: this.startX + 1, y: this.startY },
            { x: this.startX, y: this.startY },
        ];
        this.currentDir = '';
        this.isAlive = true;
    }
}
