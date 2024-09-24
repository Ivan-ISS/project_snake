// eslint-disable-next-line no-unused-vars
class Button {
    render(children, cssClass) {
        let htmlButton = `
            <button class="button ${cssClass}">
                ${children}
            </button>
        `;

        return htmlButton;
    }
}
