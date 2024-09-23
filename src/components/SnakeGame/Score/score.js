// eslint-disable-next-line no-unused-vars
class Score {
    constructor() {
        this.srcImg = 'src/images/png/snakeDecor.png';
        this.localStorageUtil = new LocalSrorageUtil('bestScoreSnake');
        this.bestScore = this.localStorageUtil.loadData() || 0;
        this.currentScore = 0;
    }

    render() {
        let htmlScoreboard = `
            <div class="scoreboard">
                <div class="scoreboard__text-block">
                    <div class="scoreboard__currentScore">Текущий счет: ${this.currentScore}</div>
                    <div class="scoreboard__bestScore">Лучший счет: ${this.bestScore}</div>
                </div>
                <div class="scoreboard__img-block">
                    <img class="scoreboard__img" src="${this.srcImg}" alt="funny snake"/>
                </div>
            </div>
        `;

        return htmlScoreboard;
    }

    _update() {
        const currentScore = document.querySelector('.scoreboard__currentScore');
        const bestScore = document.querySelector('.scoreboard__bestScore');
        currentScore.textContent = `Текущий счет: ${this.currentScore}`;
        bestScore.textContent = `Лучший счет: ${this.bestScore}`;
    }

    increase() {
        this.currentScore += 1;
        this._update();
    }

    reset() {
        if (this.currentScore > this.bestScore) {
            this.bestScore = this.currentScore;
            this.localStorageUtil.saveData(this.currentScore);
        }
        this.currentScore = 0;
        this._update();
    }
}
