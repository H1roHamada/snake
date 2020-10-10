window.onload = function () {

    const canvas = document.getElementById('game');
    const ctx = canvas.getContext("2d");
    const START_BTN = document.querySelector('.startBtn');
    const SETTING_BTN = document.querySelector('.settingsBtn');

    ctx.fillStyle = "#fff";
    ctx.font = 'bold 50px sans-serif';
    ctx.textBaseline = "center";
    ctx.textAlign = "center";
    ctx.fillText('Управление на стрелках', 640, 150);

    START_BTN.addEventListener('click', () => {

        START_BTN.parentNode.removeChild(START_BTN);
        pause = false;
        SETTING_BTN.insertAdjacentHTML('beforeBegin', `

            <div class="score">Score:<span id="score_counter">0</span></div>
            <button class="pauseBtn">Pause</button>

    `);
        startGame();

    })
}

function startGame() {
    document.addEventListener("keydown", control);
    setInterval(updateGame, 1000 / 60); // 60 FPS
    const PAUSE_BTN = document.querySelector('.pauseBtn');
    const SCORE_COUNTER = document.getElementById('score_counter');
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext("2d");

    let
    gameStart = firstKey = false; //начало игры или первая нажатая клавиша
    speed = 3; //начальная скорость змейки
    xv = yv = 0; //скорость
    snakeX = ~~(canvas.width / 2); //положение змейки по X
    snakeY = ~~(canvas.height / 2); //положение змейки по Y
    snakeWidth = snakeHeight = 20; //размер змейки
    foodWidth = foodHeight = 22; //размер еды
    food = [ //еда
        'apple',
        'mango',
        'strawberry',
        'watermelon',
        'pineapple',
        'cheese',
    ];
    foodPos = {} //позиция фрукта
    snake = []; //змейка
    tail = 10; //максимальная длина хвоста в начале
    tailSave = 20; //минимальная длина хвоста после самопоедания
    cooldown = false;
    cooldownTime = 50;
    score = 0;

    PAUSE_BTN.addEventListener('click', () => {
        if (pause == true) {
            pause = false;
            PAUSE_BTN.classList.remove('pause');
        } else {
            pause = true;
            PAUSE_BTN.classList.add('pause');
        }
    });

    const fruitFill = new Image(); //рисуем фрукт
    randomFruit(food) //выбираем случайный фрукт


    //game render
    function updateGame() { //функция отрисовки игры
        if (pause == false) {

            //draw canvas
            ctx.fillStyle = '#95d842'; //цвет поля
            ctx.fillRect(0, 0, canvas.width, canvas.height) //положение и размер поля
            ctx.drawImage(fruitFill, foodPos.x, foodPos.y); //отрисовка фрукта

            //snake speed
            snakeX += xv;
            snakeY += yv;

            snakeRender();
            snakeEatFood();
            snakeEatYoyrself();
            snakeTeleport();
        } else return;

    }

    function itemPos() { //генератор позиции фрукта
        foodPos = {
            x: Math.floor((Math.random() * canvas.width)),
            y: Math.floor((Math.random() * canvas.height)),
        }
        if (foodPos.x >= 1248) foodPos.x -= 32; //чтобы фрукт не вылазил за края (ширина)
        if (foodPos.y >= 608) foodPos.y -= 32; //чтобы фрукт не вылазил за края (высота)
        return foodPos;
    }

    function randomFruit(arr) { //выбор случайного фрукта
        let random = Math.floor(Math.random() * arr.length);
        fruit = arr[random];
        fruitFill.src = `img/food/${fruit}.png`;
        itemPos(); //выбираем случайную позицию

        return fruit;
    }

    function snakeRender() {
        //snake render
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = 'green'; //цвет змейки
            ctx.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeHeight)//положение
        }

        snake.push({ x: snakeX, y: snakeY, color: ctx.fillStyle })//увеличение длины змейки

        //tail limit
        snakeResetLength();
    }

    function snakeEatYoyrself() {
        //snake eating yourself
        if (snake.length >= tail && gameStart) {
            // console.log(`snake = ${snake.length}, tail = ${tail}`); //! DELETE

            for (let i = snake.length - tailSave; i >= 0; i--) {
                if (
                    snakeX < (snake[i].x + snakeWidth) &&
                    snakeX + snakeWidth > snake[i].x &&
                    snakeY < (snake[i].y + snakeHeight) &&
                    snakeY + snakeHeight > snake[i].y
                ) {
                    tail = 10;
                    speed = 3;

                }
            }
        }
        snakeResetLength();

    }

    function snakeEatFood() {
        //eating
        if (
            snakeX < (foodPos.x + foodWidth) &&
            snakeX + foodWidth > foodPos.x &&
            snakeY < (foodPos.y + foodHeight) &&
            snakeY + foodHeight > foodPos.y
        ) {
            // alert(`foodPosX = ${foodPos.x} foodPosY = ${foodPos.y}, snakeX = ${snakeX} snakeY = ${snakeY}`); //!DELETE

            score++;
            SCORE_COUNTER.innerText = score;
            speed += .1;
            tail += 10;

            randomFruit(food);
        }
    }

    function snakeTeleport() {
        //snake teleport
        if (snakeX > canvas.width) { //если длина змейки по X = длине канваса(snakeX = 1280), правая сторона экрана
            snakeX = 0; // то змейка телепортируется в начало координаты, левая сторона
        }

        if (snakeX + snakeWidth < 0) { //тоже самое, с левого края
            snakeX = canvas.width; //телепортируется на X = 1280, правая сторона
        }

        if (snakeY > canvas.height) { //если упирается в верх
            snakeY = 0;
        }

        if (snakeY + snakeHeight < 0) {// если упирается вниз
            snakeY = canvas.height;
        }
    }

    function control(event) { //управление
        if (pause == false) {
            if (!firstKey && [37, 38, 39, 40].indexOf(event.keyCode) > -1) { //проверка, нажата кнопка или нет
                setTimeout(function () { gameStart = true; }, 1000);
                firstKey = true;
            }

            if (cooldown) {
                return false;
            }

            if (event.keyCode == 37 && !(xv > 0)) { // влево
                xv = -speed; yv = 0;
            }

            if (event.keyCode == 38 && !(yv > 0)) { // вверх
                xv = 0; yv = -speed;
            }

            if (event.keyCode == 39 && !(xv < 0)) { // вправо
                xv = speed; yv = 0;
            }

            if (event.keyCode == 40 && !(yv < 0)) { // вниз
                xv = 0; yv = speed;
            }

            // if (event.keyCode == 32) {
            //     console.log(`foodPosX = ${foodPos.x} foodPosY = ${foodPos.y}`); //!DELETE
            //     console.log('-----------------------------------------------'); //!DELETE
            //     console.log(`snakeX = ${snakeX} snakeY = ${snakeY}`); //!DELETE
            // }

            cooldown = true;
            setTimeout(function () { cooldown = false; }, `${cooldownTime}`);//защищает от быстрых нажатий, чтобы змейка не вошла сама в себя
            //пример, двигаюсь влево, если быстро нажать вверх и в право, то змейка войдет сама в себя.
        } else return;

    }

    function snakeResetLength() {
        if (snake.length > tail) { //tail - начальная длина змейки, запускается проверка, чтобы змейка была фиксированной длины
            snake.shift();//удаляет лишнюю длину из масиива
        }
    }

}
