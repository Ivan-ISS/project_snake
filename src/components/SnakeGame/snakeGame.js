// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize) {
        const startCoord = Math.floor(fieldSize / 2);
        this.field = new Field(fieldSize);
        this.snake = new Snake(startCoord, startCoord, fieldSize);
    }

    render() {
        const htmlField = this.field.render();

        const htmlSnakeGame = htmlField;

        return htmlSnakeGame;
    }

    start() {
        this.snake.render();

        document.addEventListener('keydown', (e) => {
            this.snake.move(e.code);
        });
    }
}
