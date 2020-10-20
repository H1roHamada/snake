import { mainMenu, gameScreen, continueBtn } from "./screens.js";
import { startGame } from "./main.js";
import { isContinue } from "./gameLogic.js";


export function renderMainMenu() {

    var GAME = document.querySelector('.game');
    var GAME_SCREEN = document.querySelector('.game_screen');

    GAME_SCREEN.insertAdjacentHTML('afterbegin', mainMenu);
    if (localStorage.getItem('snake') !== null) {
        document.querySelector('.main_menu-btn-newGame').insertAdjacentHTML('beforebegin', continueBtn);
    }

    const MAIN_MENU = document.querySelector('.main_menu');
    const MAIN_MENU_BTN = document.querySelectorAll('.main_menu-btn>button');
    MAIN_MENU_BTN.forEach(btn => btn.addEventListener('click', (e) => {

        switch (btn.dataset.btn) {
            case 'ms-continue':
                isContinue(true)
                break;

            case 'ms-newGame':
                isContinue(false)
                break;

            case 'ms-settings':
                break;

            case 'ms-statistics':
                break;
        }
        GAME_SCREEN.parentNode.removeChild(GAME_SCREEN);
        GAME.insertAdjacentHTML('afterbegin', gameScreen);
        startGame(btn.dataset.btn);
    }));

}
