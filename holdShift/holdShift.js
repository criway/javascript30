const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;
function handleCheck (e) {
	//check if they have the shift key down.
	//and check if they are checking it
	let inBetween = false;
	if (e.shiftKey && this.checked) {
		//go aahead and do what we please
		//loop over every single checkbox
		checkboxes.forEach(checkbox => {
			console.log(checkbox);
			if (checkbox === this || checkbox === lastChecked) {
				inBetween = !inBetween;
			}
			
			if (inBetween) {
				checkbox.checked = true;
			}
		});
	}
	lastChecked = this;
}
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));