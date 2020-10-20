import { renderMainMenu } from "./render.js";
import {
    darkMode,
    complexity,
    canvasW,
    canvasH,
    yv,
    xv,
    tail,
    speed,
    snake,
    snakeX,
    snakeY,
    tailSave,
    snakeWidth,
    snakeHeight,
    fruitArr,
    foodHeight,
    randomFruit,
    score,
    pause,
    firstKey,
    cooldown,
    gameStart,
    cooldownTime,
    version,
    //--------------------

    control,
    snakePos,
    snakeResetLength,
    snakeTeleport,
    snakeEatFood,
    snakeEatYourself,
    pauseToggle,
    saveGame,

} from "./gameLogic.js";




renderMainMenu();
export function startGame(lvl) {


    const RECORD = document.getElementById('record_table');
    const PAUSE_BTN = document.querySelector('.pauseBtn')
    const SCORE = document.getElementById('score_counter');
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext("2d");
    const drawFruit = new Image();



    document.addEventListener("keydown", (e) => {
        control(event);
    });

    document.addEventListener("keyup", (e) => {
        if (e.keyCode == 27) {
            pauseToggle(PAUSE_BTN)
        }
    });

    PAUSE_BTN.addEventListener("click", () => {
        pauseToggle(PAUSE_BTN);
    });

    requestAnimationFrame(update)






    function update() {
        requestAnimationFrame(update);
        if (pause == false) {

            //draw canvas and fruit
            ctx.fillStyle = '#95d842';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(drawFruit, randomFruit.x, randomFruit.y);

            snakePos();

            //draw render
            for (let i = 0; i < snake.length; i++) {

                ctx.fillStyle = 'green';
                ctx.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeHeight);

            }

            snake.push({ x: snakeX, y: snakeY, color: ctx.fillStyle });

            //tail limit
            snakeResetLength();
            snakeTeleport();
            snakeEatFood();
            snakeEatYourself(RECORD);

            SCORE.innerText = score;

            drawFruit.src = `img/food/${randomFruit.fruit}.png`;
            saveGame();
        } else return;
    }


}
