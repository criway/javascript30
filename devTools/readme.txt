Exercise number 9 of javascript 30 series: 14 Must know Dev Tools Tricks:
	CSS:
	HTML:
	JAVASCRIPT:
		"console": gives access to depuration console of the browser.
			Soms methods:
				.log('message'): Outputs a message to the Web Console
				.warn('warning message'): Outputs a warning message to the Web Console.
				.error('error message'): Outputs an error message to the Web Console.
				.info('info message'): Outputs an informational message to the Web Console. In Firefox and Chrome, a small "i" icon is displayed next to these items in the Web Console's log.
				.assert(assertion, 'error message'): Writes an error message to the console if the assertion is false. If the assertion is true, nothing happens.
				.clear(): Clears the console.
				.group('identification')/.groupColapsed('identification')->.groupEnd('identification'): Creates a new inline group in the Web Console log. This indents all following output by an additional level, 
					until console.groupEnd() is called./ Exits the current inline group in the Web Console. See Using groups in the console in the console documentation for details and examples.
				.count():Logs the number of times that this particular call to count() has been called. This function takes an optional argument label.
				.time('identification')-->.timeEnd('identification'): Starts a timer you can use to track how long an operation takes. You give each timer a unique name.
					When you call console.timeEnd() with the same name, the browser will output the time, in milliseconds, that elapsed since the timer was started.
				.table()
				
	DEVTOOLS BROWSER:
		-1 right click on element, Break on.., attribute modifications. This will break the process whenever any attribute is modified.
		