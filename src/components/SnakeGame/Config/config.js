// eslint-disable-next-line no-unused-vars
class Config {
    constructor(fieldSize) {
        this.moveParams = {
            ArrowRight: { next: 'ArrowLeft', dX: 1, dY: 0, start: 1, endX: fieldSize, endY: 0 },
            ArrowLeft: { next: 'ArrowRight', dX: -1, dY: 0, start: fieldSize, endX: 1, endY: 0 },
            ArrowUp: { next: 'ArrowDown', dX: 0, dY: -1, start: fieldSize, endY: 1, endX: 0 },
            ArrowDown: { next: 'ArrowUp', dX: 0, dY: 1, start: 1, endY: fieldSize, endX: 0 },
        };

        this.speedIncrements = [
            { scoreThreshold: 10, speedMultiplier: 0.01, speedLimit: 150 },
            { scoreThreshold: 30, speedMultiplier: 0.02, speedLimit: 150 },
            { scoreThreshold: 40, speedMultiplier: 0.03, speedLimit: 150 },
            { scoreThreshold: 70, speedMultiplier: 0.05, speedLimit: 100 },
            { scoreThreshold: 100, speedMultiplier: 0.05, speedLimit: 50 },
        ];
    }

    audio = {
        srcStart: './src/components/SnakeGame/audio/sfx_start.wav',
        srcPoint: './src/components/SnakeGame/audio/sfx_point.wav',
        srcHit: './src/components/SnakeGame/audio/sfx_hit.wav',
        srcGameOver: './src/components/SnakeGame/audio/sfx_gameover.wav',
    };
}
