// eslint-disable-next-line no-unused-vars
class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    render(x, y) {
        this.x = x;
        this.y = y;

        const allCells = document.querySelectorAll('.field__cell');
        Array.prototype.forEach.call(allCells, (cell) => {
            cell.classList.remove('food');
        });

        const food = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        food.classList.add('food');
    }
}
