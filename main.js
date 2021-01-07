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
