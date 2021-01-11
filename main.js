const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');

const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpText = document.querySelector('.pop-up__message');

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const IMG_SIZE= 80;
const GAME_DURATION = 5;

let started = false;
let score = 0;
let timer = undefined; 

field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', ()=> {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});
popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
})

function startGame() {
    initGame();
    showStopButton();
    startGameTimer();
    showTimerAndScore();
    started = true;
}

function stopGame() {
    stopGameTimer();
    hideGameBtn();
    showPopUpWithText('Replay❓');
    started = false;
}

function finishGame(win) {
    started = false;
    hideGameBtn();
    showPopUpWithText(win ? 'YOU WIN 🏆 ' : 'YOU LOST🔥')
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
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

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else  if (target.matches('.bug')){
        stopGameTimer();
        finishGame(false);
    }
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - IMG_SIZE;
    const y2 = fieldRect.height - IMG_SIZE;

    for ( let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.position = 'absolute';

        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
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
