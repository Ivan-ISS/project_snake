// eslint-disable-next-line no-unused-vars
class Main {
    render(children) {
        let htmlMain = `
            <div class="main">
                <section class="main__snake-game snake-game">
                    <div class="snake-game__container container-common">
                        ${children}
                    </div>
                </section>
            </div>
        `;

        return htmlMain;
    }
}
