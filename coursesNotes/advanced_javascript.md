# Advanced_Javascript course notes
## scope
Javascript is not a compile language. 
3 pass trough the code.

var foo = "bar"; this is actually 2 statements or 2 different operations. 1 declaration operation and 1 initialization operation.
JIT Just In Time compilation.
LHS left-hand side of statement. The target
RHS right-hand side of statement. The source

Undefined and undeclare are different

undeclar: there was no declaration for an LHS in any scope we have access to.
undefined: it is declare but it has the especially empty value which we call "undefined"

### Function-declaration VS function-expression
It is a function expression whenever the "function" keyword is not the very first word in the statement.
### Named-function-expression VS Unnamed-function-expression
hightly recommended use of named-function-expression. 3 reasons:
	1. very usefull when debuggin so we avoid having anonymous functions
	2. the function will exists in its own scop, so we can use recursive.
	3. more descriptive code


### IIFE pattern

### let keyword
sets the variable to the very first scope it found, while var keyword attach it to the function scope:

		function foo() {
			if(true) {
				var firstvar = "bar";
				let secondvar = "bar";
			}
			
			console.log(firstvar);
			console.log(secondvar); //ReferenceError
		} 
		
in this example, as firstvar is declared with "var" keyword, it is attached to the foo function scope.
BUT, the secondvar variable, as it is declared with the "let" keyword, it is attached to the if block scope.

With the let keyword, we have to declare all variables on the top of the block, becaouse let variables don't exist till them are declared
> *let blocks or let statements*
	let(baz="bar") {
		console.log(baz);
	}
we set a secific block for the baz varibale existance

### Dynamic scope
The decision for how scoping works, is a runtime decision as opposed to, in lexical scoping, it's an author time decision.


QUIZ:
1. What type of scoping rule(s) does Javascript have? Exceptions?
		lexical scope. Exceptions with "eval" and "with" keywords.
2. What are the different ways you can create a new scope?
		functions, try-catch, curly braces, let keyword
3. What's the difference between undeclared and undefined?
		undefined has a value and it is a declared variable. Undeclare variables throw refference error
		
		
### Hoisting
It is a concept we have invented to explain what javascript does.
variable and funciton declarations at first when "javascript" compiles, hoist them to the top of the code. 
		
		a;
		b;
		var a = b;
		var b = 2;
		a;
		b;
we use to think that javascript will start by line 1 to execute the code , but actually, what javascript does firest is a first-reading to search for variable and function declarations, 
and then "hoist" them to the top.
		
	-->var a
	-->var b
		a;
		b;
		a = b;
		b = 2;
		a;
		b;
		
So the compile face is the first to lines, while the execution phase is the rest.
Function-declaration will be hoisted while function-expression not.
On hoisting, functions are first moved to the top, then variables.

Multiple duplicate function declarations get overrridden. BUT multiple var declarations, only the first one valid, the rest are refused.
Mutual Recursion: when two or more functions keep calling each other.


###this keyword
Every function, while executing, has a reference to its current execution context, called "this".
Execution context is where the funciton is called or how the function is called when it's called.
there are 4 rules for ow the "this" keyword gets bound, and all of them depend upon what we call "call site". The "call site" is the placing code where a function gets exaecuted with its open close parentheses.
It is important to learn the 4 rules and its precedence between them.
1. First rule (fourth in order of precedence)-> Default Binding Rule.
	just a sinple function call like "foo()", this reffers to the global scope
2. Second rule(third in order of precedence)-> Implicit Binding Rule
	a call to an object function: "obj.foo()", this reffers to the object scope
	- Binding confusion:
		It is impossible to create a crossover between the lexical environment and the this binding mechanisms
3. Third rule(second in order of precedence)-> Explicit Binding Rule
	whe we use "call" or "apply" like "foo.call(obj)", this reffers to the obj. So we are setting the this value as we want.

	- Hard binding: construct a mechanism such a way that our methods can be passed around the way that we're accustomed to passing them around, but the this keyword inside would always be predictablea?
	
	- bind utility: to set or associate the this value to an object we want
			function bind(fn, o) {
				return function() {
					fn.call(o);
				};
			}
			
			foo = bind(foo, obj)

	ES5 added .bind directly to function prototype.
4. Fourth rule(first in order of precedence)-> New keyword
	When we put the new keyword in front of a function call, 4 things happen.
	1. brand-new empty object is created
	2. Objects get linkjed to a different object.
	3. that brand-new linked object, gets bound as the this keyword for the purposes of that function call.
	4. If that function does not otherwise return anything, then it will implicitly insert a "return this;", So the brand-new will implicity be returned to us.
	
-- Questions to ask to the call site:
 |	1. Was the funciton called with thew "new" keyword?, if so, use that object
 |	2. If not, was it called with "call" or "apply" specifying an explicit "this"?, if so, use that object
 |	3. Was the function called via a containing/owning object (context)?, if so, use that object
\/	4. DEFAULT: global object (except strict mode)

