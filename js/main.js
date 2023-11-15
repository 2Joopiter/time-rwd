const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');

const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 10, name: 'morning' },
	{ cond: new Date().getHours() >= 10 && new Date().getHours() < 16, name: 'afternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

setInterval(() => {
	changeTheme(data);
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}, 1000);

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

	data.forEach((el) => {
		if (el.cond) main.classList.add(el.name);
	});
}
