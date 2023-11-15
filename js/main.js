const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');

//자주 바뀔만한 값을 전역변수 형태로 객체를 배열로 묶어서 따로 빼서 관리.
//해당 값이 아래 함수에서 호출되도록 처리

const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 10, name: 'morning' },
	{ cond: new Date().getHours() >= 10 && new Date().getHours() < 16, name: 'afternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

setInterval(() => {
	//data 전역변수를 인수로 받아서 호출처리
	changeTheme(data);
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}, 1000);

// 시간값을 구해서 반환하는 함수

function getTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	//현재 시간값이 13 이상이 되면 12를 뺀 값을 hr로 리턴
	hr = hr > 12 ? hr - 12 : hr;
	return [hr, min, sec];
}

// 반환된 시간값을 인수로 받아서 DOM에 세팅하는 함수

function setTime(num, index) {
	numbers[index].innerText = num < 10 ? '0' + num : num;
}

// 시간에 따른 테마 변경 함수
function changeTheme(info) {
	//전역 data를 바로 활용하는 것이 아닌 info라는 파라미터를 통해서 전달받도록 처리

	//const hr = new Date().getHours();
	main.className = '';

	data.forEach((el) => {
		if (el.cond) main.classList.add(el.name);
	});

	/*

	if (hr >= 5 && hr < 10) {
		main.classList.add('morning');
	}
	if (hr >= 10 && hr < 16) {
		main.classList.add('afternoon');
	}
	if (hr >= 16 && hr < 20) {
		main.classList.add('evening');
	}
	if (hr >= 20 || hr < 5) {
		main.classList.add('night');
	}

  */
}
