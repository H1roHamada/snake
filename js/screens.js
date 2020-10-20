import { gameVar } from "./settings.js";

let version = gameVar.version;
console.log(version);

export const continueBtn = `
    <button class="main_menu-btn-сontinue" data-btn='ms-continue'>Продолжить</button>
`;



export const mainMenu = `
    <div class="main_menu">
        <div class=" main_menu-btn">
            <button class=" main_menu-btn-newGame" data-btn='ms-newGame'>Новая игра</button>
            <button class=" main_menu-btn-settings" data-btn='ms-settings'>Настройки</button>
            <button class=" main_menu-btn-statistics" data-btn='ms-statistics'>Статистика</button>
            </div>

            <a href="https://github.com/H1roHamada/snake/releases/tag/${version}" target="_blank "class="version">v${version}</a>
    </div>
`;

export const settingsScreen = `
    <div class="main_screen">
        <div class="settings">
            <div class="changeWindowsColor">
                <span>Dark Mode</span>
                    <div class="toggle toggle--daynight">
                        <input type="checkbox" id="toggle--daynight" class="toggle--checkbox darkMode" >
                        <label class="toggle--btn" for="toggle--daynight"><span class="toggle--feature"></span></label>
                    </div>
                </div>
                <div class="complexity">
                <span>Выбор сложности</span>
                <span class="easy " data-complexity="easy">Легко</span>
                <span class="hard " data-complexity="hard">Сложно</span>
            </div>
            <button class="backTo">Назад</button>
        </div>
        <a href="https://github.com/H1roHamada/snake/releases/tag/${version}" target="_blank "class="version">v${version}</a>
    </div>
`;


export const gameScreen = `
    <div class="header">
        <div class="score">Score:<span id="score_counter">0</span></div>
        <div class="record">Record:<span id="record_table">0</span></div>
        <button class="pauseBtn">Pause</button>
    </div>
    <div class="game_screen">
        <canvas id="game" width="1280px" height="640px"></canvas>
    </div>
`;

export const pauseSettings = `
    <div class="settings">
        <div class="changeWindowsColor">
            <span>Dark Mode</span>
            <div class="toggle toggle--daynight">
                <input type="checkbox" id="toggle--daynight" class="toggle--checkbox darkMode" >
                <label class="toggle--btn" for="toggle--daynight"><span class="toggle--feature"></span></label>
            </div>
        </div>
        <div class="complexity">
            <span>Выбор сложности</span>
            <span class="easy" data-complexity="easy">Легко</span>
            <span class="hard" data-complexity="hard">Сложно</span>
        </div>
        <button class="backTo">Закрыть</button>
    </div>
`;