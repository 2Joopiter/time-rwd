const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');
const btns = document.querySelectorAll('nav span');
const btnAuto = document.querySelector('.auto');

const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 10, name: 'morning' },
	{ cond: new Date().getHours() >= 10 && new Date().getHours() < 16, name: 'afternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

//여기까지 전역변수

// 이하 1초마다 전자시계 출력 함수 호출
// 특정 함수에 콜백 함수를 전달할 때 함수 호출구문이 아닌 정의형태로 전달
// setWatch처럼 함수명만 넣으면 정의형태이기 때문에 바로 등록 가능
// 아래처럼 changeTheme 같은 경우는 data라는 인수를 전달해야 하기 때문에 ()를 붙여야 함 > 괄호를 붙이는 순간 호출형태로 변경되므로 다시 익명함수 형태로 호출문을 감싸줘서 정의형태로 만들어줘야 함

// 콜백함수: 특정 함수가 기능을 실행하고 싶은데 그 기능이 나에겐 없지만 외부에 있음. 그럴 때 그 외부의 함수를 가져와서 빌려쓰면 됨(함수 전체를 인수로 받아서 자신의 안쪽에서 호출) > 바로 호출되지 않고 원하는 시점에 호출해야 함. 그래서 호출함수가 아니라 정의로 가져옴 > 그러면 메인 함수가 실행되는 타이밍에 실행됨

setInterval(setWatch, 1000);

let timer = setInterval(() => changeTheme(data), 1000);

//이벤트1 (함수호출)

btns.forEach((btn) => {
	// 각 버튼 클릭시
	btn.addEventListener('click', (e) => {
		// 클릭한 버튼만 활성화
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');

		// 이하 자동 롤링기능 끊어주는 기능 (setInterval을 끊어줌-1초마다 작동하기 때문에 안 끊어주면 자동으로 다시 조건에 맞게 테마가 변경됨)
		clearInterval(timer);
		//메인요소의 모든 클래스 제어
		main.className = '';
		//클릭한 버튼의 글자를 가져와서 소문자로 변경한 다음 메인요소의 클래스명으로 지정
		main.classList.add(e.currentTarget.innerText.toLowerCase());
	});
});

//auto버튼 클릭시 다시 자동 테마변경기능 실행하면서 모든 버튼 비활성화
btnAuto.addEventListener('click', () => {
	timer = setInterval(() => changeTheme(data), 1000);
	btns.forEach((btn) => btn.classList.remove('on'));
});

function setWatch() {
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}

function getTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	hr = hr > 12 ? hr - 12 : hr;
	return [hr, min, sec];
}

function setTime(num, index) {
	numbers[index].innerText = num < 10 ? '0' + num : num;
}

function changeTheme(info) {
	main.className = '';

	info.forEach((el) => {
		if (el.cond) main.classList.add(el.name);
	});
}

// 코드를 짤 때: 머릿속으로 내가 할 작업을 목록화.
// 자동 반복기능 끊기 > 메뉴 클릭 > 클릭할 버튼을 가져와서 / class를 바꿔치기
