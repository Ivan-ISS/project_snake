// eslint-disable-next-line no-unused-vars
class Food {
    constructor() {}

    _calcCoord(fieldSize, snakeCoord) {
        const { x, y } = randomWithСheck(1, fieldSize, snakeCoord);
        this.x = x;
        this.y = y;
    }

    render(fieldSize, snakeCoord) {
        this._calcCoord(fieldSize, snakeCoord);

        const allCells = document.querySelectorAll('.field__cell');
        Array.prototype.forEach.call(allCells, (cell) => {
            cell.classList.remove('food');
        });

        const food = document.querySelector(`[data-x="${this.x}"][data-y="${this.y}"]`);
        food.classList.add('food');
    }
}
