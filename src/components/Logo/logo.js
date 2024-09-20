/* eslint-disable no-unused-vars */
class Logo {
    constructor(src) {
        this.src = src;
    }

    render() {
        let htmlLogo = `
            <div class="logo">
                <img class="logo__img" src="${this.src}" alt="logo"/>
            </div>
        `;

        return htmlLogo;
    }
}
