// eslint-disable-next-line no-unused-vars
class Snake {
    constructor(x, y, fieldSize) {
        this.coorSnake = [
            { x: x + 1, y: y },
            { x: x, y: y },
        ];
        this.fieldSize = fieldSize;
        this.currentDir = '';
    }

    render() {
        console.log('render snake: ', this.coorSnake);
        const allCells = document.querySelectorAll('.field__cell');
        Array.prototype.forEach.call(allCells, (cell) => {
            cell.classList.remove('head');
            cell.classList.remove('tail');
        });

        this.coorSnake.forEach((coor) => {
            const tail = document.querySelector(`[data-x="${coor.x}"][data-y="${coor.y}"]`);
            tail.classList.add('tail');
        });

        const head = document.querySelector(
            `[data-x="${this.coorSnake[0].x}"][data-y="${this.coorSnake[0].y}"]`
        );
        head.classList.remove('tail');
        head.classList.add('head');
    }

    move(dir) {
        const params = {
            right: { next: 'left', deltaX: 1, deltaY: 0, start: 1, end: this.fieldSize },
            left: { next: 'right', deltaX: -1, deltaY: 0, start: this.fieldSize, end: 1 },
            up: { next: 'down', deltaX: 0, deltaY: -1, start: this.fieldSize, end: 1 },
            down: { next: 'up', deltaX: 0, deltaY: 1, start: 1, end: this.fieldSize },
        };

        let newHead = {
            x: this.coorSnake[0].x,
            y: this.coorSnake[0].y,
        };

        if (dir in params && this.currentDir !== params[dir].next) {
            newHead.x =
                newHead.x === params[dir].end ? params[dir].start : newHead.x + params[dir].deltaX;
            newHead.y =
                newHead.y === params[dir].end ? params[dir].start : newHead.y + params[dir].deltaY;
            this.currentDir = dir;

            this.coorSnake.unshift(newHead);
            this.coorSnake.pop();
            this.render();
        } else {
            return;
        }

        /* if (direction === 'right' && this.currentDirection !== 'left') {
            newHead.x = newHead.x === this.fieldSize ? 1 : newHead.x + 1;
            this.currentDirection = direction;
        } else if (direction === 'left' && this.currentDirection !== 'right') {
            newHead.x = newHead.x === 1 ? this.fieldSize : newHead.x - 1;
            this.currentDirection = direction;
        } else if (direction === 'up' && this.currentDirection !== 'down') {
            newHead.y = newHead.y === 1 ? this.fieldSize : newHead.y - 1;
            this.currentDirection = direction;
        } else if (direction === 'down' && this.currentDirection !== 'up') {
            newHead.y = newHead.y === this.fieldSize ? 1 : newHead.y + 1;
            this.currentDirection = direction;
        } else {
            return;
        }
        this.coorSnake.unshift(newHead);
        this.coorSnake.pop();
        this.render(); */
    }
}
