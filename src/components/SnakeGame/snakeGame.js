// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize) {
        const startCoord = Math.floor(fieldSize / 2);
        this.ID = null;
        this.field = new Field(fieldSize);
        this.snake = new Snake(startCoord, startCoord, fieldSize);
        this.food = new Food();
    }

    render() {
        const htmlField = this.field.render();

        const htmlSnakeGame = htmlField;

        return htmlSnakeGame;
    }

    _collide(snakeHead, food) {
        if (snakeHead[0].x === food.x && snakeHead[0].y === food.y) {
            this.snake.eat(food.x, food.y);
            this.food.render(this.field.size, this.snake.snakeCoord);
        }
    }

    start() {
        this.snake.render();
        this.food.render(this.field.size, this.snake.snakeCoord);

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                clearInterval(this.ID);
                return;
            }
            clearInterval(this.ID);
            this.ID = setInterval(() => {
                this.snake.move(e.code);
                this._collide(this.snake.snakeCoord, this.food);
            }, 100);
        });
    }
}
