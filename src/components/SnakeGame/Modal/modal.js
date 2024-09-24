// eslint-disable-next-line no-unused-vars
class Modal {
    constructor() {}

    render(children, cssClass) {
        let htmlModal = `
            <div class="modal ${cssClass}">
                <div class="modal__text">${children}</div>
            </div>
        `;

        return htmlModal;
    }
}
