// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor() {
        this.field = new Field(25);
        this.snake = new Snake(12, 12, 25);
    }

    render() {
        const htmlField = this.field.render();

        const htmlSnakeGame = htmlField;

        return htmlSnakeGame;
    }

    start() {
        this.snake.render();

        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowDown') {
                this.snake.move('down');
            }
            if (e.code === 'ArrowUp') {
                this.snake.move('up');
            }
            if (e.code === 'ArrowRight') {
                this.snake.move('right');
            }
            if (e.code === 'ArrowLeft') {
                this.snake.move('left');
            }
        });
    }
}
