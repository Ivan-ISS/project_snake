// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize, initialSpeed) {
        this.ID = null;
        this.isPause = false;
        this.config = new Config(fieldSize);
        this.resourceLoader = new Resources();
        this.fieldSize = fieldSize;
        this.initialSpeed = initialSpeed;
        this.speed = initialSpeed;

        this._prepare();
        this._initEntities();
    }

    render() {
        const htmlStartOverBtn = this.button.render('Начать заново', 'start-over');
        const htmlPauseBtn = this.button.render('Пауза', 'pause');

        const htmlLeftBtn = this.button.render('&#8656;', 'arrow-left');
        const htmlUpBtn = this.button.render('&#8657;', 'arrow-up');
        const htmlRightBtn = this.button.render('&#8658;', 'arrow-right');
        const htmlDownBtn = this.button.render('&#8659;', 'arrow-down');

        const htmlField = this.field.render();
        const htmlScore = this.score.render();
        const htmlModalPause = this.modal.render('Пауза', 'modal-pause');
        const htmlModalGameOver = this.modal.render('Игра окончена', 'modal-game-over');

        const htmlSnakeGame = `
            <div class="game">
                <div class="game__control-panel">${htmlStartOverBtn + htmlPauseBtn}</div>
                <div class="game__field-score">${htmlField + htmlScore}</div>
                <div class="game__btn-panel">
                    <div class="game__arrow-wrap">${htmlUpBtn}</div>
                    <div class="game__arrow-wrap">${htmlLeftBtn}${htmlRightBtn}</div>
                    <div class="game__arrow-wrap">${htmlDownBtn}</div>
                </div>
                ${htmlModalGameOver}
                ${htmlModalPause}
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
        this.modal = new Modal();
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

    _initControlElements() {
        this.startOverBtn = document.querySelector('.start-over');
        this.pauseBtn = document.querySelector('.pause');
        this.modalGameOver = document.querySelector('.modal-game-over');
        this.modalPause = document.querySelector('.modal-pause');
        this.leftBtn = document.querySelector('.arrow-left');
        this.upBtn = document.querySelector('.arrow-up');
        this.rightBtn = document.querySelector('.arrow-right');
        this.downBtn = document.querySelector('.arrow-down');
    }

    _initHendlers() {
        this.hendleKeydown = (e) => {
            if (e.code === 'Space') this._pause();

            if (!this.isPause && this.snake.checkDir(e.code)) {
                this._startAnimation(e.code);
            }
        };

        this.hendleClickArrow = (e) => {
            const dir = extractArrowDirection(e.target.className);

            if (!this.isPause && this.snake.checkDir(dir)) {
                this._startAnimation(dir);
            }
        };

        this.hendleClickPause = () => {
            this._pause();
            this.pauseBtn.blur();
        };

        this.hendleClickStartOver = () => {
            this._reset();
            this.startOverBtn.blur();
            this.modalGameOver.classList.remove('modal-game-over-show');
            this.audio.startSound.play();
        };
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
                        this._increaseSpeed();
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
        }, this.speed);
    }

    start() {
        this._drawEntities();
        this._initControlElements();
        this._initHendlers();
        this._startAnimation('ArrowRight');

        this._enableHendlers();
        this.startOverBtn.addEventListener('click', this.hendleClickStartOver);
    }

    _increaseSpeed() {
        const speedIncrements = [
            { scoreThreshold: 10, speedMultiplier: 0.01, speedLimit: 150 },
            { scoreThreshold: 30, speedMultiplier: 0.02, speedLimit: 150 },
            { scoreThreshold: 40, speedMultiplier: 0.03, speedLimit: 150 },
            { scoreThreshold: 70, speedMultiplier: 0.05, speedLimit: 100 },
            { scoreThreshold: 100, speedMultiplier: 0.05, speedLimit: 50 },
        ];

        for (const increment of speedIncrements) {
            if (
                this.score.currentScore > increment.scoreThreshold &&
                this.score.currentScore < increment.scoreThreshold + 10
            ) {
                if (this.speed > increment.speedLimit) {
                    this.speed -= this.speed * increment.speedMultiplier;
                    if (this.score.currentScore === increment.scoreThreshold) {
                        this.audio.startSound.play();
                    }
                }
                break;
            }
        }

        console.log('speed: ', this.speed);
    }

    _pause() {
        if (!this.isPause) {
            this.isPause = true;
            clearInterval(this.ID);
            this.modalPause.classList.add('modal-pause-show');
        } else {
            this.isPause = false;
            this._startAnimation(this.snake.currentDir);
            this.modalPause.classList.remove('modal-pause-show');
        }
    }

    _reset() {
        clearInterval(this.ID);
        this.snake.reset();
        this.score.reset();
        this.isPause = false;
        this.speed = this.initialSpeed;
        this._disableHendlers();
        this._enableHendlers();
        this._startAnimation('ArrowRight');
        this.modalPause.classList.remove('modal-pause-show');
    }

    _gameOver() {
        clearInterval(this.ID);
        this.snake.reset();
        this.score.reset();
        this._disableHendlers();
        this.audio.gameOverSound.play();
        this.modalGameOver.classList.add('modal-game-over-show');
    }

    _enableHendlers() {
        document.addEventListener('keydown', this.hendleKeydown);
        this.pauseBtn.addEventListener('click', this.hendleClickPause);
        [this.leftBtn, this.upBtn, this.rightBtn, this.downBtn].forEach((btn) => {
            btn.addEventListener('click', this.hendleClickArrow);
        });
    }

    _disableHendlers() {
        document.removeEventListener('keydown', this.hendleKeydown);
        this.pauseBtn.removeEventListener('click', this.hendleClickPause);
        [this.leftBtn, this.upBtn, this.rightBtn, this.downBtn].forEach((btn) => {
            btn.removeEventListener('click', this.hendleClickArrow);
        });
    }
}
