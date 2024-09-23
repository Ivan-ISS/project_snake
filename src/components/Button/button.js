// eslint-disable-next-line no-unused-vars
class Button {
    render(children) {
        let htmlButton = `
            <button class="button">
                ${children}
            </button>
        `;

        return htmlButton;
    }
}
