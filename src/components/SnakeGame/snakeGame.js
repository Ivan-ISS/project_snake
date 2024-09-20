// eslint-disable-next-line no-unused-vars
class SnakeGame {
    constructor() {
        this.field = new Field(25);
    }

    render() {
        const htmlField = this.field.render();

        const htmlSnakeGame = htmlField;

        return htmlSnakeGame;
    }
}
