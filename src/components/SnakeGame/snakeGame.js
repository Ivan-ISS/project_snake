// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize) {
        this.ID = null;
        this.isPause = false;
        this.config = new Config(fieldSize);
        this.resourceLoader = new Resources();
        this.fieldSize = fieldSize;

        this._prepare();
        this._initEntities();
    }

    render() {
        const htmlStartOverBtn = this.button.render('Начать заново', 'start-over');
        const htmlPauseBtn = this.button.render('Пауза', 'pause');
        const htmlField = this.field.render();
        const htmlScore = this.score.render();

        const htmlSnakeGame = `
            <div class="game">
                <div class="game__control-panel">${htmlStartOverBtn + htmlPauseBtn}</div>
                <div class="game__field-score">${htmlField + htmlScore}</div>
            </div>
        `;

        return htmlSnakeGame;
    }

    _initEntities() {
        const startCoord = Math.floor(this.fieldSize / 2);
        this.field = new Field(this.fieldSize);
        this.score = new Score();
        this.snake = new Snake(startCoord, startCoord, this.config.moveParams, this.audio);
        this.food = new Food();
        this.button = new Button();
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
                        this._gameOver();
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

    _initControlButtons() {
        this.startOverBtn = document.querySelector('.start-over');
        this.pauseBtn = document.querySelector('.pause');
    }

    start() {
        this._drawEntities();
        this._initControlButtons();
        this._startAnimation('ArrowRight');

        this.hendleKeydown = (e) => {
            if (e.code === 'Space') {
                this._pause();
            }

            if (!this.isPause && this.snake.checkDir(e.code)) {
                this._startAnimation(e.code);
            }
        };

        this.hendleClickPause = () => {
            this._pause();
            this.pauseBtn.blur();
        };

        this.hendleClickStartOver = () => {
            this._reset();
            this.startOverBtn.blur();
        };

        this.startOverBtn.addEventListener('click', this.hendleClickStartOver);

        this._enableHendlers();
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

    _reset() {
        clearInterval(this.ID);
        this.snake.reset();
        this.score.reset();
        this.isPause = false;
        this._disableHendlers();
        this._enableHendlers();
        this._startAnimation('ArrowRight');
    }

    _gameOver() {
        this._reset();
        clearInterval(this.ID);
        this._disableHendlers();
        this.audio.gameOverSound.play();
    }

    _enableHendlers() {
        document.addEventListener('keydown', this.hendleKeydown);
        this.pauseBtn.addEventListener('click', this.hendleClickPause);
    }

    _disableHendlers() {
        document.removeEventListener('keydown', this.hendleKeydown);
        this.pauseBtn.removeEventListener('click', this.hendleClickPause);
    }
}
