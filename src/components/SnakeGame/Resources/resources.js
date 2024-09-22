// eslint-disable-next-line no-unused-vars
class Resources {
    constructor() {
        this.RESOURCE_TYPE = {
            AUDIO: 'audio',
        };

        this.typeLoadersMap = {
            [this.RESOURCE_TYPE.AUDIO]: ({ srcPoint, srcHit, srcStart, srcGameOver }) => {
                const pointSound = new Audio();
                pointSound.src = srcPoint;

                const hitSound = new Audio();
                hitSound.src = srcHit;

                const startSound = new Audio();
                startSound.src = srcStart;

                const gameOverSound = new Audio();
                gameOverSound.src = srcGameOver;

                return {
                    pointSound,
                    hitSound,
                    startSound,
                    gameOverSound,
                };
            },
        };
    }

    load(resource) {
        const loader = this.typeLoadersMap[resource.type];
        return loader(resource);
    }
}
