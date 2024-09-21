// eslint-disable-next-line no-unused-vars
class Snake {
    constructor(x, y, fieldSize) {
        this.snakeCoord = [
            { x: x + 1, y: y },
            { x: x, y: y },
        ];
        this.fieldSize = fieldSize;
        this.currentDir = '';
    }

    render() {
        console.log('render snake: ', this.snakeCoord);
        const allCells = document.querySelectorAll('.field__cell');
        Array.prototype.forEach.call(allCells, (cell) => {
            cell.classList.remove('head');
            cell.classList.remove('tail');
        });

        this.snakeCoord.forEach((coord) => {
            const tail = document.querySelector(`[data-x="${coord.x}"][data-y="${coord.y}"]`);
            tail.classList.add('tail');
        });

        const head = document.querySelector(
            `[data-x="${this.snakeCoord[0].x}"][data-y="${this.snakeCoord[0].y}"]`
        );
        head.classList.remove('tail');
        head.classList.add('head');
    }

    eat(x, y) {
        this.snakeCoord.push({ x: x, y: y });
    }

    move(dir) {
        const fieldSize = this.fieldSize;
        const params = {
            ArrowRight: { next: 'ArrowLeft', dX: 1, dY: 0, start: 1, endX: fieldSize, endY: 0 },
            ArrowLeft: { next: 'ArrowRight', dX: -1, dY: 0, start: fieldSize, endX: 1, endY: 0 },
            ArrowUp: { next: 'ArrowDown', dX: 0, dY: -1, start: fieldSize, endY: 1, endX: 0 },
            ArrowDown: { next: 'ArrowUp', dX: 0, dY: 1, start: 1, endY: fieldSize, endX: 0 },
        };

        let newHead = {
            x: this.snakeCoord[0].x,
            y: this.snakeCoord[0].y,
        };

        if (dir in params && this.currentDir !== params[dir].next) {
            newHead.x =
                newHead.x === params[dir].endX ? params[dir].start : newHead.x + params[dir].dX;
            newHead.y =
                newHead.y === params[dir].endY ? params[dir].start : newHead.y + params[dir].dY;
            this.currentDir = dir;

            this.snakeCoord.unshift(newHead);
            this.snakeCoord.pop();
            this.render();
        } else {
            return;
        }

        /* if (dir === 'ArrowRight' && this.currentDir !== 'ArrowLeft') {
            newHead.x = newHead.x === this.fieldSize ? 1 : newHead.x + 1;
            this.currentDir = dir;
        } else if (dir === 'ArrowLeft' && this.currentDir !== 'ArrowRight') {
            newHead.x = newHead.x === 1 ? this.fieldSize : newHead.x - 1;
            this.currentDir = dir;
        } else if (dir === 'ArrowUp' && this.currentDir !== 'ArrowDown') {
            newHead.y = newHead.y === 1 ? this.fieldSize : newHead.y - 1;
            this.currentDir = dir;
        } else if (dir === 'ArrowDown' && this.currentDir !== 'ArrowUp') {
            newHead.y = newHead.y === this.fieldSize ? 1 : newHead.y + 1;
            this.currentDir = dir;
        } else {
            return;
        }
        this.snakeCoord.unshift(newHead);
        this.snakeCoord.pop();
        this.render(); */
    }
}
