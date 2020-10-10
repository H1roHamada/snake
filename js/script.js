window.onload = function () {
    document.addEventListener("keydown", control);
    setInterval(render, 1000 / 60); // 60 FPS
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

let
gameStart = firstKey = false; //начало игры или первая нажатая клавиша
speed = 3; //начальная скорость змейки
xv = yv = 0; //скорость
snakeX = ~~(canvas.width / 2); //положение змейки по X
snakeY = ~~(canvas.height / 2); //положение змейки по Y
snakeWidth = snakeHeight = 25; //размер змейки
foodWidth = foodHeight = 32; //размер еды
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
tail = 15; //максимальная длина хвоста в начале
tailSave = 20; //минимальная длина хвоста после самопоедания
cooldown = false;
score = 0;


const fruitFill = new Image(); //рисуем фрукт
randomFruit(food) //выбираем случайный фрукт


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


//game render
function render() { //функция отрисовки игры

    //render
    ctx.fillStyle = '#95d842'; //цвет поля
    ctx.fillRect(0, 0, canvas.width, canvas.height) //положение и размер поля
    ctx.drawImage(fruitFill, foodPos.x, foodPos.y); //отрисовка фрукта

    //snake speed
    snakeX += xv;
    snakeY += yv;

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

    //snake render
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green'; //цвет змейки
        ctx.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeHeight)//положение
    }

    snake.push({ x: snakeX, y: snakeY })//увеличение длины змейки

    //tail limit
    if (snake.length > tail) { //tail - начальная длина змейки, запускается проверка, чтобы змейка была фиксированной длины
        snake.shift();//удаляет лишнюю длину из масиива
    }

    //eating

}

function control(event) { //управление
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

    cooldown = true;
    setTimeout(function () { cooldown = false; }, 100);//защищает от быстрых нажатий, чтобы змейка не вошла сама в себя
    //пример, двигаюсь влево, если быстро нажать вверх и в право, то змейка войдет сама в себя. min значение - 100
}