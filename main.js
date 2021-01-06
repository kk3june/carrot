const gameTimer = document.querySelector('.game__timer');
let limit = 9;

function showTime() {
    if( limit >= 0 ){
        gameTimer.textContent= `00:0${limit}`;
        limit-=1;
    }
}

setInterval(showTime, 1000);
