const dogs = [
	{
		name: 'Snickers',
		age: 2
	},
	{
		name: 'Hugo',
		age: 8
	}
]

function makeGreen() {
	const p = document.querySelector('p');
	p.style.color = '#BADA55';
	p.style.fontSize = '50px';
}

//Regular
console.log('hello');
//Interpolated
console.log('Hello I am %s string!', 'jejeje');
//Styled
console.log('%c I am some great text', 'font-size:50px; background:red');
//warning!
console.warn('OH NOO');
//error 
console.error('shit!');
//info
console.info('this is just info');
//testing
console.assert(1===2, 'that is wrong!');
//clearing
console.clear();
//Viewing DOM Elements;
const p = document.querySelector('p');
console.log(p);
console.dir(p);
//Grouping together
console.clear();
dogs.forEach(dog => {
	//console.group(dog.name);
	console.groupCollapsed(dog.name);
	console.log('this is %s', dog.name);
	console.log('%s is %s years old', dog.name, dog.age);
	console.log('%s is %s dog years old', dog.name, dog.age*7);
	console.groupEnd(dog.name);
});
//Counting
console.count('Wes');
console.count('Wes');
console.count('Wes');
console.count('Wes');
//timing
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
	.then(data => data.json())
	.then(data => {
		console.timeEnd('fetching data');
		console.log(data);
	});
console.table(dogs);