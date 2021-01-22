'use strict';
import PopUp from './popUp.js';
import Field from './field.js';
import * as sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');


const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListner(()=> {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListner(onItemClick);


function onItemClick(item) {
    if (!started) {
        return;
    }
    if (item === 'carrot') {
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item ==='bug'){
        finishGame(false);
    }
}

gameBtn.addEventListener('click', ()=> {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    initGame();
    showStopButton();
    startGameTimer();
    showTimerAndScore();
    started = true;
    sound.playBackground();
}

function stopGame() {
    stopGameTimer();
    hideGameBtn();
    gameFinishBanner.showWithText('Replay❓');
    sound.playAlert();
    sound.stopBackground();
    started = false;
}

function finishGame(win) {
    started = false;
    hideGameBtn();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    stopGameTimer();
    sound.stopBackground();
    gameFinishBanner.showWithText(win ? 'YOU WIN 🏆 ' : 'YOU LOST🔥');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameBtn() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if( remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`
    
}

function initGame() {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();

}


function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}



/* my first code
****************************************************************************************
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');
const popUp = document.querySelector('.pop-up');
const refresh = document.querySelector('.pop-up__refresh');
let limit = 9;

// GameTimer function
function showTime() {
    if( limit >= 0 ){
        gameTimer.textContent= `00:0${limit}`;
        limit-=1;
    } else {
        popUp.classList.remove('pop-up--hide');
    }
}
setInterval(showTime, 1000);



function createImgBugs() {
    const field__Height = gameField.clientHeight;
    const field__width = gameField.clientWidth;

    let availHeight = field__Height - 50;
    let availWidht = field__width - 50;

    let randNum_H = Math.round(Math.random() * availHeight);
    let randNum_W = Math.round(Math.random() * availWidht);

    const bugs = document.createElement('img');
    bugs.setAttribute('src','img/bug.png');
    bugs.setAttribute('class','bug');
    gameField.appendChild(bugs);
    bugs.style.top = randNum_H + "px";
    bugs.style.left = randNum_W + "px";

    bugs.addEventListener('click', () => {
        bugs.classList.add('clicked');
        countBugs();
    })
}

function createImgCarrots() {
    const field__Height = gameField.clientHeight;
    const field__width = gameField.clientWidth;

    let availHeight = field__Height - 50;
    let availWidht = field__width - 50;

    let randNum_H = Math.round(Math.random() * availHeight);
    let randNum_W = Math.round(Math.random() * availWidht);

    const carrots = document.createElement('img');
    carrots.setAttribute('src','img/carrot.png');
    gameField.appendChild(carrots);
    carrots.style.top = randNum_H + "px";
    carrots.style.left = randNum_W + "px";

    carrots.addEventListener('click', () => {
        popUp.classList.remove('pop-up--hide');
    })
}


    refresh.addEventListener('click', () => {
        console.log("clicked");
        window.location.reload();
    });


function countBugs () {
    let countBug = document.querySelectorAll('.bug').length;
    console.log(countBug);
}


createImgBugs();
createImgBugs();
createImgBugs();
createImgBugs();
createImgCarrots();
createImgCarrots();
createImgCarrots();


****************************************************************************************
*/
