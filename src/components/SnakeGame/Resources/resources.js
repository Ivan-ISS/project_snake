// eslint-disable-next-line no-unused-vars
class Resources {
    constructor() {
        this.resource_type = {
            audio: 'audio',
        };

        this.typeLoadersMap = {
            [this.resource_type.audio]: async ({ src }) => {
                return new Promise((resolve, reject) => {
                    const audio = new Audio();
                    audio.src = src;

                    audio.addEventListener('loadedmetadata', () => resolve(audio));
                    audio.addEventListener('error', (error) => reject(error));
                });
            },
        };
    }

    async load(resource) {
        const loader = this.typeLoadersMap[resource.type];
        return await loader(resource);
    }
}
