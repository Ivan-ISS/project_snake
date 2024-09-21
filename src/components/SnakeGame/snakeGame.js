// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize) {
        const startCoord = Math.floor(fieldSize / 2);
        this.ID = null;
        this.fieldSize = fieldSize;
        this.field = new Field(fieldSize);
        this.snake = new Snake(startCoord, startCoord, fieldSize);
        this.food = new Food();
    }

    render() {
        const htmlField = this.field.render();

        const htmlSnakeGame = htmlField;

        return htmlSnakeGame;
    }

    collide(snakeHead, food) {
        if (snakeHead[0].x === food.x && snakeHead[0].y === food.y) {
            this.snake.eat(food.x, food.y);

            const { x: foodX, y: foodY } = randomWithСheck(
                1,
                this.fieldSize,
                this.snake.snakeCoord
            );
            this.food.render(foodX, foodY);
        }
    }

    start() {
        this.snake.render();
        const { x: foodX, y: foodY } = randomWithСheck(1, this.fieldSize, this.snake.snakeCoord);
        this.food.render(foodX, foodY);

        document.addEventListener('keydown', (e) => {
            clearInterval(this.ID);
            this.ID = setInterval(() => {
                this.snake.move(e.code);
                this.collide(this.snake.snakeCoord, this.food);
            }, 200);
        });
    }
}

/* helpers */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomWithСheck(min, max, arr) {
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
}
