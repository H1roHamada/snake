const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

let box = 32; //кол-во пикселей квадрата
let score = 0; //счет
let direction; //переменная для направления
let newHead; //переменная для увелечения змейки



let foods = [ //фрукты
    'apple',
    'mango',
    'strawberry',
    'watermelon',
    'pineapple',
    'cheese',
]

let foodsPos = {} //позиция фрукта

let snake = []; //змея
snake[0] = {
    x: 9 * box,
    y: 10 * box,
}


const fruitFill = new Image(); ; //рисуем фрукт
randomFruit(foods) //выбираем случайный фрукт

const gameFill = new Image(); gameFill.src = '../img/bg.png'; //рисуем игровое поле


function randomFruit(arr) { //выбор случайного фрукта
    let random = Math.floor(Math.random() * arr.length);
    fruit = arr[random];
    fruitFill.src = `../img/food/${fruit}.png`;
    itemPos(); //выбираем случайную позицию
    return fruit;
}

function itemPos() {
    foodsPos = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    }
    return foodsPos;
}



function control(event) { //кнопки управления

    if (event.keyCode == 37 && direction != 'right') {
        direction = 'left';
    }

    else if (event.keyCode == 38 && direction != 'down') {
        direction = 'up';
    }

    else if (event.keyCode == 39 && direction != 'left') {
        direction = 'right';
    }

    if (event.keyCode == 40 && direction != 'up') {
        direction = 'down';
    }
}



function render() { //функция отрисовки игры

    ctx.drawImage(gameFill, 0, 0);
    ctx.drawImage(fruitFill, foodsPos.x, foodsPos.y);

    for (let i = 0; i < snake.length; i++) { //перебираем массив со змейкой
        ctx.fillStyle = i == 0 ? 'green' : 'red'; //если элемент в массиве первый(голова), то он зеелного цвета, остальные красного
        ctx.fillRect(snake[i].x, snake[i].y, box, box); //отрисовка
    }

    let snakeX = snake[0].x; // доп переменная для тела по X
    let snakeY = snake[0].y; // доп переменная для тела по Y

    if (snake[0].x == foodsPos.x && snake[0].y == foodsPos.y) { //обработчик соприкосновнеия с фруктом
        score++; //увеличить счет
        randomFruit(foods); //выбрать фрукт
        console.log(fruit);


    } else {
        snake.pop() //удаляет последний элемент змейки, чтобы она не была бесконечной, если убрать это, то каждое обнровление экрана змейка будет увеличиваться на 1
    }



    if (direction == 'right') snakeX += box; //направление змейки вправо
    if (direction == 'left') snakeX -= box; //направление змейки влево
    if (direction == 'up') snakeY -= box; //направление змейки вверх
    if (direction == 'down') snakeY += box; //направление змейки вниз



    let newSnake = { //создание тела змейки
        x: snakeX,
        y: snakeY,
    }
    snake.unshift(newSnake) //создаем доп ячейку для змейки

}
setInterval(render, 200);

document.addEventListener("keydown", control);
