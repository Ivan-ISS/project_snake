// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor(fieldSize) {
        this.ID = null;
        this.isPause = false;
        this.config = new Config(fieldSize);
        this.resourceLoader = new Resources();
        this.fieldSize = fieldSize;
        this.initialSpeed = this.config.initialSpeed;
        this.speed = this.config.initialSpeed;
        this.delay = this.config.delay;

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

    initGame() {
        const startCoord = Math.floor(this.fieldSize / 2);
        this.snake = new Snake(startCoord, startCoord, this.config.moveParams, this.audio);
        this.food = new Food();
    }

    _initEntities() {
        this.field = new Field(this.fieldSize);
        this.score = new Score();
        this.button = new Button();
        this.modal = new Modal();
    }

    async prepare() {
        const { srcStart, srcPoint, srcHit, srcGameOver } = this.config.audio;

        this.audio = {
            startSound: await this.resourceLoader.load({ type: 'audio', src: srcStart }),
            pointSound: await this.resourceLoader.load({ type: 'audio', src: srcPoint }),
            hitSound: await this.resourceLoader.load({ type: 'audio', src: srcHit }),
            gameOverSound: await this.resourceLoader.load({ type: 'audio', src: srcGameOver }),
        };
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
        cancelAnimationFrame(this.ID);
        let counter = this.delay * 0.5;

        const frame = () => {
            const now = Date.now();
            const delta = now - this.lastUpdate;

            counter += delta / this.speed;

            if (counter > this.delay && this.snake.isAlive) {
                this.snake.move(dir);
                this._collide([this.snake, this.food]);
                counter = 0;
            }

            this.lastUpdate = now;
            this.ID = requestAnimationFrame(frame);
        };
        this.ID = requestAnimationFrame(frame);
    }

    start() {
        this.lastUpdate = Date.now();

        this._drawEntities();
        this._initControlElements();
        this._initHendlers();
        this._startAnimation('ArrowRight');

        this._enableHendlers();
        this.startOverBtn.addEventListener('click', this.hendleClickStartOver);
    }

    _increaseSpeed() {
        for (const increment of this.config.speedIncrements) {
            if (
                this.score.currentScore > increment.scoreThreshold &&
                this.score.currentScore < increment.scoreThreshold + 10
            ) {
                if (this.speed > increment.speedLimit) {
                    this.speed -= increment.speedMultiplier;
                    if (this.score.currentScore === increment.scoreThreshold + 1) {
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
            cancelAnimationFrame(this.ID);
            this.modalPause.classList.add('modal-pause-show');
        } else {
            this.isPause = false;
            this._startAnimation(this.snake.currentDir);
            this.modalPause.classList.remove('modal-pause-show');
        }
    }

    _reset() {
        cancelAnimationFrame(this.ID);
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
        cancelAnimationFrame(this.ID);
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
