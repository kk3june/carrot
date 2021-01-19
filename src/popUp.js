'use strict';

// export default 는 클래스를 바깥으로 노출시키는 명령어
// 이 파일 뿐만 아니라 외부에서도 해당 파일을 볼 수 있도록
// export 한 후에는 반드시  main js 파일에서 import
export default class PopUp {
    constructor () {
        this.popUp = document.querySelector('.pop-up');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    // popUp 클래스에 사용자가 원하면 setClickListner 라는 함수를 통해서 클릭 리스너를 등록할 수 있다.
    setClickListner(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}