Contents:
	Syntax best practices
	behavioral
	structural comonents
	server-side	

-Why Best Practices?
	Javascript is taken more importance everywhere due to new techs, but javascript has much differences with other programming languages.
		-Don`t work in a vacuum
		-Don`t believe everything you read
		-It is dangerous to go alone
		-Take knowledge with you
		-"this"
		-common strugles and understanding it
		-strict mode
		-closure
		-Write your code in a maintainally way
		-Tons of packages to use and make our lives easier
		-Tools
		
-Syntax
	Can be painfull, is different fom other languages. Does things different.
	-Semicolons, how they work
	-Linting
	-Equality, can be painfull
	-Variables
	-Functions
	
	->Semicolons
	"Semicolons are optional in Javascript", but it is mandatory for certain statements. Why are optional in some and mandatory in other?
	we must understand how javascript works. Semicolons are automatically inserted, so we must know what the rules are to tis automatic semicolon insertion.
		->Automatic Semicolon Insertion
		There are 3 rules that Javascript compiler look at to insert or not semicolon
			-When, as a Script or Module is parsed from left or right, a token (called the offending token) is encountered that is NOT ALLOWED by any production of the grammar.
				a)When the offending token is separated from te previous token by at least one LineTerminator its going to insert a semicolon.
				b)When the offending token is "}"
			-When, as the Scrip or Module is parsed from left to the right, the end of the input stream of token is encountered,
			then a semicolon is automatically inserted at the end of the inut sream. ex: console.log(2+2) <- ;
			-When, a token is encountered that is allowed by some production of the grammar, but the production is a restricted production and the token would be the first of 
			a restricted production, and the restricted token is separated from the previous token by at least one LineTerminator, then a semicolon is automatically inserted before
			the restricted token.
				*Restricted Production: continue, break, return, or throw...
		Jonathan Mills rule: Use semicolons in conjunction with JSHint or ESLint to prevent potential issues. This make you take a habit (other languages uses it).
	->Linting
	A linter scans your code to detect potential problems and errors.
		-JS Lint created by Douglas Crockford in 2002. Preconfigured, not very configurable
		-JS Hint, fork of JSLintm, much more configurable, built in package support, not extensible
		-ESLint, the most recent, custom rules support, lots of configuration
	We will work with JSHint, www.jshint.com, you can copy your code to the webpage and see the errors, but this way of work is not the best. 
	There is a plugin jsHint to be awared while coding.
		npm install -g jshint
		jshint <myFile>.js ->this will check your code and will aware of errors.
		
		->Curly Braces
		As we have seen with the restricted production "return", we HAVE TO write the "{" in the same line after the return word. 
		So for consistence objectives, we should write it in the same line always and not in next line. Example:
					function some () 
					{											//<-- no ERROR
						return
						{										//<-- ERROR	
							some: "some";
						};
					}
		Solve the restricted production issue:
					function some () 
					{											//<-- no ERROR
						return {										//<-- no ERROR	
							some: "some";
						};
					}
		But its is not really nice to have some in the same line and others in the next one... So:
					function some () {											//<-- no ERROR
						return {										//<-- no ERROR	
							some: "some";
						};
					}
		
	->Equality "==" "==="
		How do I compare things? Comparing types and objects.
					var x = 1; var y = '1';
					console.log(x==y); 			//returns true
					console.log(x===y); 			//returns false
			->"==": If variables are two different types, it will convert them to the same type
			->"===": There will not be type conversion. Use this as default.
		Another issue is:
					if(x){
						...
					}
		this is the same as
					if(x == true){
						...
					}
		So this is not to check if any variable exists or not.
		To check if exist or not:
					if(typeof x !== 'undefined'){
						...
					}
					
	->Variables
		Variables work different in Javascript.
		A VAR statement declares variables that are scoped to the running execution context's VariableEnvironment. Var variables are created when their containing Lexical
		Environment is instatiated and are initialized to undefined when created.
			->Hoisting: is Javascript's default behavior of moving all declarations to the top of the current scope.
				So first the compiler check all scope to variable declarations, and after, execute whatever have to.
				A recomendation is to put all variable declarations at the top.
			
	->Functions
		Also behaves different.
		2 ways to create functions:
			->Declarations
			->Expressions
		As in variables, the compiler runs the code twice, the first search for declarations, the second executes te function.
		In Javascrip, functions are firstClass objects, which means we can assign functions to variables, and this is called a function expression.
		So if we have a function expression, we cannot call it before its declaration:
				expression();
				var expression = function() {
					console.log('hello');
				};
		Because of Hoisting, the first time the compiler checks the code, initialize expression to undefined.
		But if we have function declarations, we can call them before:
				myFunc();
				
				function myFunc() {
					console.log('hello');
				}
		WHY use function expressions??
			Realle usefull to pass functions as variables, callbacks etc... But this does not means function expressions are better... This may cause some problems because of hoisting.
		
		Good practice to write code:
			1. variables
			2. functions
					2.1 variables
					2.2 functions
							2.2.1 log stuff
					2.3 run code
			3. run code
		
->Behaviors
	JavaScript is helpfull, but not always is a good thing.
	
	->Global Variables
		there is a weird thing Javascript does. Look at this example:
			var toPrint = "print me";
			
			function print(out) {
				stringToPrint = out;
				console.log(stringToPrint);
			}
			
			print('Hello');
			console.log(stringToPrint);
		When it executes print function, it finds a left hand reference, "stringToPrint = out;", javascript will search for a local variable "sringToPrint" and as it does not exist, javascript thinks that you are trying to
		define a variable and you forgot it, so Javascript creates a global variable "stringToPrint" with "Hello" value.
		But it we write "print('Hello');" after "console.log(stringToPrint);", an error will appear bacause "stringToPrint" is not defined.
		
		This thing is a bit dangerous bacause probably creates some behavior we don't expect to.
		
		We must prevent this kind of "help" from javascript when it thinks we have missed something.
		
	->Strict Mode
		When declaring 'use strict' at the top of the code, we are saying "I know what I do, so I don't let Javascript to try to help and guess what I pretend to do". 
		In this mode, javascript won't declare variables you don't want to (for example).
		One important thing to take care about, is that strictMode is implemented inside the scope you declare "use strict" so you may want the strictMode inside an especific function but not outside it.
		
	->Read Only Properties
		Javascript let us to define some object properties, I meanm, not only the value of the property but also others like "enumerable" "configurable" "writable"... 
		example:
				var obj = {};
				Object.defineProperty(obj, 'readOnly', {
					enumerable: false,
					writable: false,
					value: 'This var is read only'
				));
				console.log(obj.readOnly);
		So, we might try to assign some values to variables that already are not writable but we don´t know it. Javascript will try to "help" you and asssume that you already knew the variable was not writable and will loose
		the new value you are trying to assing.
				obj.readOnly = 'otherValue';
				console.log(obj.readOnly); //-->'This var is read only'
		And no error occurs, so the program wont brake BUT it does not work as you are imaging.
		To avoid this, simple: 'use strict' , then an error will jump and will explain you are trying to write some non-writable variable.
		
	->Deleting Stuff
		->"delete" keyword: is only good to remove something from an object!!!
			var obj = {a: 100, b:200},
				myVar = 10;
			
			delete obj.a;			
			console.log.(obj); //-->{b:200}
			delete myVar;
			console.log.(myVar); //-->10  !!!
			delete obj;
			console.log.(obj); //-->{b:200} !!!!
			
			
		Javascrip in order to be "helpfull" does not delete things you cannot;
		If we use 'use strict', an error will be fired when trying to delete myVar.
		
	->Duplicates
			
			function x(a, b, a) {
				console.log(a);
			}
			x(1,2,3);		 //--> 3		AGAIN!!! USE 'use strict' to avoid this!
	
	->This
		One of the most confusing things that are involved in javascript.
		How it works, what it does, what it means...
		It is used to reach into the containing object for the variables or proeperties that are on that object.
		-> .bind() : to bind an object, so we are assigning to "this" an object.
		
		So the place where we create functions that use "this" doesn´t matter at all, because we can manage to assign objects to "this"
		
		When we create new objects, the "new" keyword binds a new scope: example:
			var obj = function(){
				console.print(this);
				this.hello = "hello";
				this.greet = function(){
					console.log(this.hello);
				}
			}
			var greeter = obj(); //->this will print the global scope as we dont have 'use strict'
			var greeter2 = new obj(); //-> this will print ane empty object {} as when it prints doesn´t have attributes yet.
			greeter2.greet(); //->prints "hello"
		
		A good practice when coding with this inside an object is to copy "this" value into a new variable and use the new variable instead of "this", because otherwise the code could work different that we expect to.
			var obj = function(){
				var _this = this;
				console.print(_this);
				_this.hello = "hello";
				_this.greet = function(){
					console.log(_this.hello);
				}
			}
			
->Async Patterns
	Is a painpoint for people.
		-async patterns
		-callbacks
		-promises
		-async
		
	->Callbacks
		Callbacks can be at first painfull and not the easyest way to follow code. "callback hell"
		Different way to do callbacks and is bit easier to follow.
			-First rule: you don't have to use anoymous functions. So we can extract functions into a named function, and we can follow better the flow.
			-Error Handleing: when we execute callbacks, parameters are (error, data...)
			-Normal callback use we want is: first execute code and whenever de code finish, then execute the callback. So no more code should be processed. A good practice is to write "return calback(..);"
				BUT not always this is the behavior we want.
				
	->Promises ( www.promisejs.org)
		Promises are not available natively in browsers, so we must load the code <script>...</script>
		They stract the callback function we pass within the parameters and allow us to separate.
		A promise makes our function "thenable"
				function asyncMethod(message) {
					return new Promise(function (fulfill, reject) {
						setTimeout(function () {
							console.log(message);
							fulfill();
						}, 500);
					});
				}
				
				asyncMethod('my message').then(function (){});
		
		Promise takes 2 arguments: "fulfill" and "reject", if everything executes well with no errors, then the promise will execute "fulfill" method, which is the function we pass after "then".
		As we can see...works similar to callbacks, but there is no callback parameter in asyncMethod.
		The good part of this is, if we have some linked functions by callbacks or promises, we can do:
				function function2(){
					return asyncMethod('message2');
				}
				function function3(){
					return asyncMethod('message3');
				}
				function function4(){
					return asyncMethod('message4');
				}
				asyncMethod('message1')
					.then(function2)
					.then(function3)
					.then(function4)
					.then(function(){});
		We can also pass a second function inside "then", this second function will be executed in case of reject, i mean in case of error
				asyncMethod('message1')
					.then(function2, error)
					.then(function3, error)
					.then(function4, error)
					.then(function(){}, error);
					
	->Using ES6 and Babel
	->Async - Await
		key word "async" declares async functions, for this seems necessary to have babel
		keyword await eliminate the callback
		
->Production Code
	Node.js Best Practices
	Npm
	Environment
	Cross Platform Gotchas
	
	->Npm settings
		The first we are gonna do is to init our package "npm init". It is gonna create package.json file.
		->Package.json
			-"engines" or verions of node that i am allowed to run. This is recommended to fix versions and put some restrictions to ensure your app is gonna work.
			-npm install express --save:
				save is written to automatically insert express as a dependency on your package.json
			-npm config set save=true
				always will save the package dependency, no needs of --save, BUT it writes:
					"dependencies": {
						"express": "^4.13.4"
					}
				the ^ symbol means that everytime another upper version exists, download and install it.
			-npm config set save-exact=true
				this will write:
					"dependencies": {
						"express": "4.13.4"
					}
				no upper version symbol is indicated, so will install just that version and no automatically updates.
				
	->Environment
		-tool foreman:
			npm install -g foreman
			
			It is going to run script
			"script": {
				"start": "node app.js"
			}
			
			so! to run it now! just write: "npm start" inside the app folder.
			we can also run by: "nf sart", nf is te foreman package that will do some automatic staff
			
			For this, we can write an .env file to set environment values (Json Format):
					{
						"port": 9000,
						"connection": {
							"sql": "",
							"mongo": "",
						}
					}
			foreman will look to this file and will get that values
				console.log("Express Listening on port: " + process.env.PORT) //->9000
	->Cross Platform
		nodejs is cross plaform, can be ran in linux, windows etc... BUT we can have problems with upper and lower cases
		ALWAYS write in lower case: insted of "myFile.js" -> "my-file.js"
	
	->KISS Principal: Keep It Simple...(smarty?)
		"Tools ar for solving problems... Not for making them..."
		Do not use tools because are cools, but use to solve problems