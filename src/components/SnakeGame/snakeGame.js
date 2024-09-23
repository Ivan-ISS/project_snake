// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize) {
        this.ID = null;
        this.isPause = false;
        this.config = new Config(fieldSize);
        this.resourceLoader = new Resources();
        this.fieldSize = fieldSize;
    }

    render() {
        this._prepare();
        this._initEntities();

        const htmlField = this.field.render();
        const htmlScore = this.score.render();
        const htmlSnakeGame = htmlField + htmlScore;

        return htmlSnakeGame;
    }

    _initEntities() {
        const startCoord = Math.floor(this.fieldSize / 2);
        this.field = new Field(this.fieldSize);
        this.score = new Score();
        this.snake = new Snake(startCoord, startCoord, this.config.moveParams, this.audio);
        this.food = new Food();
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

    _drawEntities() {
        this.snake.draw();
        this.food.draw(this.field.size, this.snake.coord);
    }

    _collide(entities) {
        const snake = entities[0];
        const head = entities[0].coord[0];

        entities.forEach((entity) => {
            entity.coord.forEach((coor, index) => {
                if (head.x === coor.x && head.y === coor.y) {
                    if (entity instanceof Food) {
                        snake.eat(coor.x, coor.y);
                        this.score.increase();
                        this._drawEntities();
                        return;
                    } else if (entity instanceof Snake && index !== 0) {
                        snake.death();
                    }
                }
            });
        });
    }

    _startAnimation(dir) {
        clearInterval(this.ID);

        this.ID = setInterval(() => {
            this.snake.move(dir);
            this._collide([this.snake, this.food]);
        }, 300);
    }

    start() {
        this._drawEntities();

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') this._pause();

            if (!this.isPause && this.snake.checkDir(e.code)) {
                this._startAnimation(e.code);
            }
        });
    }

    _pause() {
        if (!this.isPause) {
            this.isPause = true;
            clearInterval(this.ID);
        } else {
            this.isPause = false;

            this._startAnimation(this.snake.currentDir);
        }
    }
}
