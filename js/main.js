const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');
const btns = document.querySelectorAll('nav span');

const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 10, name: 'morning' },
	{ cond: new Date().getHours() >= 10 && new Date().getHours() < 16, name: 'afternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

//여기까지 전역변수

let timer = setInterval(() => {
	changeTheme(data);
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}, 1000);

//이벤트1 (함수호출)

btns.forEach((btn) => {
	// 각 버튼 클릭시
	btn.addEventListener('click', (e) => {
		// 클릭한 버튼만 활성화
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');

		// 이하 자동 롤링기능 끊어주는 기능 (setInterval을 끊어줌)
		clearInterval(timer);
		//메인요소의 모든 클래스 제어
		main.className = '';
		//클릭한 버튼의 글자를 가져와서 소문자로 변경한 다음 메인요소의 클래스명으로 지정
		main.classList.add(e.currentTarget.innerText.toLowerCase());
	});
});

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
