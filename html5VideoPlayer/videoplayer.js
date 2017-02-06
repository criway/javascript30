/*get our elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*build our functions*/

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}
function updateButton(){
	const icon = this.paused ? '&#9658' : '&#9208';
	toggle.innerHTML = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}
/*Hook up event listeners*/
video.addEventListener('pause',  updateButton)
video.addEventListener('play', updateButton);
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));