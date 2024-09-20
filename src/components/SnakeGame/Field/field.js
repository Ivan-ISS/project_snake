// eslint-disable-next-line no-unused-vars
class Field {
    constructor(size) {
        this.size = size;
    }

    render() {
        let htmlCells = '';

        for (let i = 1; i <= this.size; i++) {
            for (let j = 1; j <= this.size; j++) {
                htmlCells += `
                    <div class="field__cell" data-x="${j}" data-y="${i}"></div>
                `;
            }
        }

        const htmlField = `
            <div 
                style="
                    grid-template-columns: repeat(${this.size}, 1fr);
                    grid-template-rows: repeat(${this.size}, 1fr)
                "
                class="field"
            >
                ${htmlCells}
            </div>
        `;

        return htmlField;
    }
}
