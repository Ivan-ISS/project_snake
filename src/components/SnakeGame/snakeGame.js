// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize) {
        this.ID = null;
        this.config = new Config();
        this.resourceLoader = new Resources();
        this.fieldSize = fieldSize;
    }

    _initEntities() {
        const startCoord = Math.floor(this.fieldSize / 2);
        this.field = new Field(this.fieldSize);
        this.snake = new Snake(startCoord, startCoord, this.fieldSize, this.audio);
        this.food = new Food();
    }

    render() {
        this._prepare();
        this._initEntities();
        const htmlField = this.field.render();

        const htmlSnakeGame = htmlField;

        return htmlSnakeGame;
    }

    _prepare() {
        this.audio = this.resourceLoader.load({
            type: 'audio',
            srcPoint: this.config.audio.srcPoint,
            srcHit: this.config.audio.srcHit,
            srcStart: this.config.audio.srcStart,
            srcGameOver: this.config.audio.srcGameOver,
        });
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
