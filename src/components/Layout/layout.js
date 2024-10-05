class Layout {
    constructor() {
        this.logo = new Logo('src/images/svg/snake.svg');
        this.title = new Title('funny snake game'.toLocaleUpperCase());
        this.header = new Header();
        this.footer = new Footer();
        this.main = new Main();
        this.snakeGame = new SnakeGame(20);
    }

    render() {
        const htmlLogo = this.logo.render();
        const htmlTitle = this.title.render();
        const htmlHeader = this.header.render(htmlLogo + htmlTitle);

        const htmlSnakeGame = this.snakeGame.render();
        const htmlMain = this.main.render(htmlSnakeGame);

        const htmlFooter = this.footer.render('Created by Sabelnikov IS');

        const html = `<div class="layout">${htmlHeader + htmlMain + htmlFooter}</div>`;

        ROOT.innerHTML = html;
    }
}

const layout = new Layout();
layout.render();

layout.snakeGame.prepare().then(() => {
    layout.snakeGame.initGame();
    layout.snakeGame.start();
});
