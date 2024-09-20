// eslint-disable-next-line no-unused-vars
class Title {
    constructor(nameTitle) {
        this.nameTitle = nameTitle;
    }

    render() {
        let htmlTitle = `
            <div class="title">
                ${this.nameTitle}
            </div>
        `;

        return htmlTitle;
    }
}
