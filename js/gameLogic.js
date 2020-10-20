import { gameVar, newGame, continueGame } from "./settings.js";

export var yv = newGame.snake.yv;
export var xv = newGame.snake.xv;
export var tail = newGame.snake.tail;
export var speed = newGame.snake.speed;
export var snake = newGame.snake.snake;
export var snakeX = newGame.snake.snakeX;
export var snakeY = newGame.snake.snakeY;
export var randomFruit = newGame.food.randomFruit;
export var score = newGame.score;
export var record = newGame.record;
export var pastFruit = newGame.food.pastFruit;

export var gameStart = gameVar.gameStart;
export var firstKey = gameVar.firstKey;
export var cooldownTime = gameVar.cooldownTime;
export var version = gameVar.version;
export var cooldown = gameVar.cooldown;
export var pause = gameVar.pause;
export var foodWidth = gameVar.food.foodWidth;
export var foodHeight = gameVar.food.foodHeight;
export var fruitArr = gameVar.food.fruitArr;

export var snakeWidth = gameVar.snake.snakeWidth;
export var snakeHeight = gameVar.snake.snakeHeight;
export var tailSave = gameVar.snake.tailSave;

export var complexity = gameVar.settings.complexity;
export var darkMode = gameVar.settings.darkMode;
export var canvasW = gameVar.canvas.canvasW;
export var canvasH = gameVar.canvas.canvasH;


export function isContinue(cnt) {


    if (cnt === true) {
        yv = continueGame.snake.yv;
        xv = continueGame.snake.xv;
        tail = continueGame.snake.tail;
        speed = continueGame.snake.speed;
        snake = continueGame.snake.snake;
        snakeX = continueGame.snake.snakeX;
        snakeY = continueGame.snake.snakeY;
        randomFruit = continueGame.food.randomFruit;
        score = continueGame.score;
        record = continueGame.record;
        pastFruit = continueGame.food.pastFruit;
    }

}





makeFruit()

export function makeFruit() {
    // if (pastFruit === false) {
    let fruitPos = {
        x: Math.floor((Math.random() * canvasW)),
        y: Math.floor((Math.random() * canvasH)),
    }
    if (fruitPos.x >= 1248) fruitPos.x -= 32;
    if (fruitPos.y >= 608) fruitPos.y -= 32;

    let fruit = fruitArr[Math.floor(Math.random() * fruitArr.length)];
    randomFruit = {
        x: fruitPos.x,
        y: fruitPos.y,
        fruit: fruit,
    }
    // }

    // pastFruit = false;

}

export function control(event) {
    if (pause == false) {


        if (!firstKey && [37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            setTimeout(function () { gameStart = true; }, 1000);
            firstKey = true;
        }

        if (cooldown) {
            return false;
        }

        // left
        if (event.keyCode == 37 && !(xv > 0)) {
            xv = -speed; yv = 0;

        }

        //up
        if (event.keyCode == 38 && !(yv > 0)) {
            xv = 0; yv = -speed;


        }

        //right
        if (event.keyCode == 39 && !(xv < 0)) {
            xv = speed; yv = 0;

        }

        //down
        if (event.keyCode == 40 && !(yv < 0)) {
            xv = 0; yv = speed;

        }

        cooldown = true;
        setTimeout(function () { cooldown = false; }, `${cooldownTime}`);
    } else return;
}

export function snakePos() {
    snakeX += xv;
    snakeY += yv;
}

export function snakeResetLength() {
    if (snake.length > tail) {
        snake.shift();
    }
}

export function snakeTeleport() {
    //snake teleport
    if (complexity == 'easy') {
        if (snakeX > canvasW) { //если длина змейки по X = длине канваса(snakeX = 1280), правая сторона экрана
            snakeX = 0; // то змейка телепортируется в начало координаты, левая сторона
        }

        if (snakeX + snakeWidth < 0) { //тоже самое, с левого края
            snakeX = canvasW; //телепортируется на X = 1280, правая сторона
        }

        if (snakeY > canvasH) { //если упирается в верх
            snakeY = 0;
        }

        if (snakeY + snakeHeight < 0) {// если упирается вниз
            snakeY = canvasH;
        }
    }

    if (complexity == 'hard') {
        if (snakeX + snakeWidth > canvasW ||
            snakeX < 0 ||
            snakeY + snakeHeight > canvasH ||
            snakeY < 0) { endGame() }
    }

}

export function snakeEatFood() {

    if (
        snakeX < (randomFruit.x + foodWidth) &&
        snakeX + foodWidth > randomFruit.x &&
        snakeY < (randomFruit.y + foodHeight) &&
        snakeY + foodHeight > randomFruit.y
    ) {
        switch (randomFruit.fruit) {
            case 'apple':
                score += 2;
                break;

            case 'mango':
                score += 5;
                break;

            case 'strawberry':
                score += 8;
                break;

            case 'pineapple':
                score += 11;
                break;
        }

        speed += .1;
        tail += 10;

        makeFruit();
    }
}

export function snakeEatYourself(RECORD) {
    //snake eating yourself
    if (snake.length >= tail && gameStart) {

        for (let i = snake.length - tailSave; i >= 0; i--) {

            if (
                snakeX < (snake[i].x + snakeWidth) &&
                snakeX + snakeWidth > snake[i].x &&
                snakeY < (snake[i].y + snakeHeight) &&
                snakeY + snakeHeight > snake[i].y
            ) {
                if (record < score) {
                    record = score;
                }
                tail = 10;
                speed = 3;
                score = 0;
            }
        }
    }
    snakeResetLength();
    updateRecord(RECORD);

}

export function updateRecord(RECORD) {
    RECORD.innerText = record;
    if (record < score) {
        record = score;
    }
}

//! SAVE LOAD
export function saveGame() {
    let savedGame = {
        snakeX: snakeX,
        snakeY: snakeY,
        snake: snake,
        speed: speed,
        xv: xv,
        yv: yv,
        randomFruit: randomFruit,
        score: score,
        record: record,
        // level: level,
        tail: tail,
        pastFruit: pastFruit,

    }

    let snakeJSON = JSON.stringify(savedGame);
    localStorage.setItem('snake', snakeJSON);
}

export function pauseToggle(PAUSE_BTN) {

    PAUSE_BTN.classList.toggle('pause');

    if (pause == false) {
        pause = true;
    } else {
        pause = false;
    }

}