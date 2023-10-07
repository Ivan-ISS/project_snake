if (localStorage.getItem('score')) {
    const bestResult = document.querySelector('.scoreboard__best')
    bestResult.textContent = `Best: ${localStorage.getItem('score')}`;
}

window.isMoving = false
window.interval = 400

const tailStyle = 'background-color: #4d4d4d; border-radius: 10px;'
const snakeHead = 'background-color: #757575; border-radius: 10px;'
const foodStyle = 'background-color: green; border-radius: 10px;'
let id

class Cell {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    _collide(food, score) {
        if (this.x === food.x && this.y === food.y) {
            this._bump(food, score)
            if (this.speed > 200) { this.speed = this.speed - this.speed * 0.07 }
            console.log(this.speed)
            window.interval = this.speed - 50
            food._bump(this, score)
        }
    }
}

class Field {
    constructor(x, y) {
        this.numX = x
        this.numY = y
        this.fieldNode = document.querySelector('.field')
        this._draw()
    }

    _draw() {
        let str = ''
        for (let i = 1; i <= this.numX; i = i + 1) {
            for (let j = 1; j <= this.numY; j = j + 1) {
                str = str + `<div class="field__cell" data-coord="[${i}, ${j}]"></div>`
            }
        }
        this.fieldNode.innerHTML = str
    }
}

class Score {
    constructor(score) {
        this._score = score
}

    //_resetToZero() {
    //    this._score = 0
    //    this._draw()
    //}

    _draw() {
        this.scoreNode = document.querySelector(`.scoreboard__now`)
        this.scoreNode.innerHTML = `Now: ${this._score}`
    }

    _increase() {
        this._score = this._score + 1
        this._draw()
        if (localStorage.getItem('score')) {
            if (localStorage.getItem('score') < this._score) {
                localStorage.setItem('score', this._score)
            }
        } else {
            localStorage.setItem('score', this._score)
        }
    }
}

class Snake extends Cell {

    constructor(x, y, food, score) {
        super(x, y)
        this.speed = 500
        this._coorSnake = [
            { x: this.x + 1, y: this.y },
            { x: this.x, y: this.y }
        ]
        this.foodX = food.x
        this.foodY = food.y
        this._draw()
    }

    _draw() {
        this.tailNode = document.querySelector(`[data-coord="[${this._coorSnake[0].x}, ${this._coorSnake[0].y}]"]`)
        this.tailNode.style = tailStyle
        this.snakeHeadNode = document.querySelector(`[data-coord="[${this._coorSnake[this._coorSnake.length - 1].x}, ${this._coorSnake[this._coorSnake.length - 1].y}]"]`)
        this.snakeHeadNode.style = snakeHead
        const foodNode = document.querySelector(`[data-coord="[${this.foodX}, ${this.foodY}]"]`)
        foodNode.style = foodStyle
    }

    _update(foodX, foodY) {
        if (foodX && foodY) {
            this.foodX = foodX
            this.foodY = foodY
        }
        const allCell = document.querySelectorAll('.field__cell');
        allCell.forEach((item) => {
            item.style = 'background-color: #4C2F27;'
            for (let i = 0; i < this._coorSnake.length; i = i + 1) {
                const tailNode = document.querySelector(`[data-coord="[${this._coorSnake[i].x}, ${this._coorSnake[i].y}]"]`)
                tailNode.style = tailStyle
            }
            this._draw()
        })
    }

    _bump(cell, score) {
        this._coorSnake.unshift({ x: cell.x, y: cell.y })
        score._increase()
    }

    _death() {
        const allCell = document.querySelectorAll('.field__cell');
        this.x = null
        this.y = null
        const bestResult = document.querySelector('.scoreboard__best');
        const btnRestart = document.querySelector('.btn-restart');
        bestResult.textContent = `Best: ${localStorage.getItem('score')}`;
        btnRestart.style = 'display: block;'
        this.tailNode = null
    }

    _collideTail(food) {
        if (this.x !== food.x && this.y !== food.y) {
            for (let i = 0; i < this._coorSnake.length - 1; i = i + 1) {
                if (this.x === this._coorSnake[i].x && this.y === this._coorSnake[i].y && this.x !== food.x && this.y !== food.y) {
                    this._death()
                    clearInterval(id)
                }
            }
        }
    }

    move(code, food, score) {
     
        id = setInterval(() => {
            if (code === 'ArrowUp') {
                if (this.x === 1) { this.x = 11 }
                this._coorSnake.push({ x: this.x = this.x - 1, y: this.y })
                this._coorSnake.shift()
            } else if (code === 'ArrowLeft') {
                if (this.y === 1) { this.y = 11 }
                this._coorSnake.push({ x: this.x, y: this.y = this.y - 1})
                this._coorSnake.shift()
            } else if (code === 'ArrowRight') {
                if (this.y === 10) { this.y = 0 }
                this._coorSnake.push({ x: this.x, y: this.y = this.y + 1})
                this._coorSnake.shift()
            } else if (code === 'ArrowDown') {
                if (this.x === 10) { this.x = 0 }
                this._coorSnake.push({ x: this.x = this.x + 1, y: this.y})
                this._coorSnake.shift()
            }
            if (this.x !== null && this.y !== null) {
                this._collideTail(food)
                this._update()
                this._collide(food, score)
            }
        }, this.speed);
    }
}

class Food extends Cell {

    constructor(x, y) {
        super(x, y)
        this.foodNode = document.querySelector(`[data-coord="[${this.x}, ${this.y}]"]`)
        this.foodNode.style = foodStyle
    }

    _bump(snake) {
        this.foodNode.style = snakeHead
        this.x = random (1, 10)
        this.y = random (1, 10)
        const matchСhecking = () => {
            snake._coorSnake.forEach((item) => {
                if (this.x === item.x && this.y === item.y) {
                    this.x = random (1, 10)
                    this.y = random (1, 10)
                    matchСhecking()
                } else {
                    return
                }
            })
        }
        matchСhecking()
        this.foodNode.style = foodStyle
        snake._update(this.x, this.y)
    }
}

class Game {
    constructor() {
        this.startCoorX = 5;
        this.startCoorY = 5;
    }

    play() {
        const field = new Field(10, 10);
        const score = new Score(0);
        const food = new Food(random(1, 10), matchСhecking(random(1, 10)));
        const snake = new Snake(this.startCoorX, this.startCoorY, food, score);
        let direction = '';
        snake.move('ArrowUp', food, score);

        document.addEventListener('keydown', (event) => {
            
            if (!window.isMoving) {
                let dir = event.code;

                if(dir !== direction) {
                    clearInterval(id);
                    if (event.code === 'ArrowDown' && direction === 'ArrowUp') { dir = direction; }
                    if (event.code === 'ArrowUp' && direction === 'ArrowDown') { dir = direction; }
                    if (event.code === 'ArrowRight' && direction === 'ArrowLeft') { dir = direction; }
                    if (event.code === 'ArrowLeft' && direction === 'ArrowRight') { dir = direction; }
                    snake.move(dir, food, score);
                    window.isMoving = true;
                    direction = dir;
                    setTimeout(() => {
                        window.isMoving = false
                    }, window.interval)
                }
            }
        });
    }
}

function random (min, max) {
    let result = Math.floor(Math.random() * (max - min + 1) + min)
    return result
}

const matchСhecking = (number) => {
    if (number === 5) {
        number = random (1, 10)
        return matchСhecking(number)
    } else {
        return number
    }
}

const triggerBeginGame = document.querySelector('.field');
const allCell = document.querySelectorAll('.field__cell');
const inscription = document.querySelector('.begin');
let reload = null

triggerBeginGame.addEventListener('click', () => {
    if (reload) {
        location.reload()
    }
    inscription.style = 'display: none'
    allCell.forEach(function(item) {
        item.style = 'background-color: #4C2F27;'
    })
    const playing = new Game()
    playing.play()
    reload = true
})

const btnRestart = document.querySelector('.btn-restart');
btnRestart.addEventListener('click', () => {
    location.reload()
    allCell.forEach(function(item) {
        item.style = 'background-color: #4C2F27;'
    })
    const playing = new Game()
    playing.play()
    btnRestart.style = 'display: none;'
})