let canvasW = 1280;
let canvasH = 640;


export let gameVar = {
    settings: {
        darkMode: true,
        complexity: 'easy'
    },

    canvas: {
        canvasW: canvasW,
        canvasH: canvasH,
    },

    snake: {
        snakeWidth: 20,
        snakeHeight: 20,
        tailSave: 20,
    },

    food: {
        foodHeight: 32,
        foodWidth: 32,
        fruitArr: [
            'apple',
            'mango',
            'strawberry',
            'pineapple',
        ],
    },
    firstKey: false,
    gameStart: true,
    score: 0,
    record: 0,
    pause: false,
    cooldown: false,
    cooldownTime: 50,

    version: '1.0.4',
};




export let newGame = {
    snake: {
        snake: [],
        snakeX: ~~(canvasW / 2),
        snakeY: ~~(canvasH / 2),
        speed: 3,
        yv: 0,
        xv: 0,
        tail: 20,
    },

    food: {
        randomFruit: {},
        pastFruit: false,
    },

    score: 0,
    record: 0,
};


if (localStorage.getItem('snake') != null) {
    let load = JSON.parse(localStorage.getItem('snake'));
    var continueGame = {
        snake: {
            snake: load.snake,
            snakeX: load.snakeX,
            snakeY: load.snakeY,
            speed: load.speed,
            yv: load.yv,
            xv: load.xv,
            tail: load.tail,
        },

        food: {
            randomFruit: load.randomFruit,
            pastFruit: true,
        },

        score: load.score,
        record: load.record,
    };
}

export { continueGame};
