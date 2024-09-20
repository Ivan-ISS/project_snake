class Layout {
    constructor() {
        this.logo = new Logo('src/images/svg/snake.svg');
        this.title = new Title('FUNNY SNAKE GAME');
        this.header = new Header();
    }

    render() {
        const htmlLogo = this.logo.render();
        const htmlTitle = this.title.render();
        const htmlHeader = this.header.render([htmlLogo, htmlTitle]);

        ROOT.innerHTML = htmlHeader;
    }
}

const layout = new Layout();
layout.render();
