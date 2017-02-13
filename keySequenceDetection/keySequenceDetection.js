const pressed = [];
const secretWord = document.getElementById("secretWord");
var secretCode ="wesbos", startGame=false;

function initialize (e) {
	secretCode = secretWord.value;
	startGame = !startGame;
	console.log(startGame);
};
document.getElementById("initialForm").addEventListener("submit", initialize);
/*window.addEventListener('keyup', (e) => {
	console.log(e.key);
	pressed.push(e.key);
	pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
	if(pressed.join('').includes(secretCode)) {
		console.log("DING DING!!!");
	};
});*/