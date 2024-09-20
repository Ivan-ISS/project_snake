class Layout {
    constructor() {
        this.logo = new Logo('src/images/svg/snake.svg');
        this.title = new Title('funny snake game'.toLocaleUpperCase());
        this.header = new Header();
        this.main = new Main();
        this.snakeGame = new SnakeGame();
    }

    render() {
        const htmlLogo = this.logo.render();
        const htmlTitle = this.title.render();
        const htmlHeader = this.header.render(htmlLogo + htmlTitle);

        const htmlSnakeGame = this.snakeGame.render();
        const htmlMain = this.main.render(htmlSnakeGame);

        const html = `<div class="layout">${htmlHeader + htmlMain}</div>`;

        ROOT.innerHTML = html;
    }
}

const layout = new Layout();
layout.render();
