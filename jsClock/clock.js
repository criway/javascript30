const secondHand = document.querySelector('.second-hand');
const minutsHand = document.querySelector('.minut-hand');
const hoursHand = document.querySelector('.hour-hand');

function setDate() {
	const now = new Date();
	const seconds = now.getSeconds();
	const secondsDegrees = (seconds/60)*360+90;
	secondHand.style.transform = 'rotate('+secondsDegrees+'deg)';
	
	const mins = now.getMinutes();
	const minsDegrees = (mins/60)*360+90;
	minutsHand.style.transform = 'rotate('+minsDegrees +'deg)';
	
	const hours = now.getHours();
	const hoursDegrees = (hours/12)*360+90;
	hoursHand.style.transform = 'rotate('+hoursDegrees +'deg)';
	
}
setInterval(setDate, 1000);