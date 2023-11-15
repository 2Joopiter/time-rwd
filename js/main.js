const screen = document.querySelector('.screen');
const numbers = screen.querySelectorAll('span');
const em = screen.querySelectorAll('em');

setInterval(() => {
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	//getTime 함수가 시간, 분, 초를 배열로 반환
	//반환된 배열값을 그대로 반복하면서 setTime 함수에 인수로 전달
	//setTime 함수는 반복을 돌면서 시간, 분, 초가 1자리수일 때 앞에 0을 붙여주는 공통로직을 반복처리
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
