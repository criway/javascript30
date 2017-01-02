ArrayCardio notes:
This exercise is to play with arrays and some of its very useful methods (filter, map, sort, reduce).
	HTML:
		"em element": emphasize the text (inclinado)
	JAVASCRIPT:
		"console.table(element)": will display in javascript console the element inside a table.
		"Array.from()": converts to an array.
		"array":
			"filter (callback[, thisArg])": creates a new array with all elements that pass an implemnented test.
						If the callback function returns anything non truthy, then the element will not pass the test.
						It calls the callback function with 3 arguments:
							-element value
							-element index
							-original arrayObject
						thisArg is optional value to use with "this" inside the callback function.
						It will pass elements that has a value assigned.
						Never modifies the original array.
			"map (callback[, thisArg])": creates a new array with the results of every element passed by the callback function
						It pass to the callback function 3 arguments:
							-currentValue
							-index
							-origina array
						thisArg is optional value to use with "this" inside the callback function.
						Never modidifes the original array.
						The important difference with filter is that .map() will allways return an array with size
						equals to the original array's size.
			"sort ([compareFunction])": order the elements inside the array
						The comparefunction defines the ordering rules.
						If no function is provided, the elements are converted to string and is ordered comparing the 
						string UNICODE values 
						If compareFuntion is provided, the array elementes are ordered by the returned value.
						The compareFunction is called with to elements of the array as arguments.
			"reduce(function[, initial value])": applies a function to an acumulator and to every array value.
						Pass 4 arguments:
							-last value: last returned value from the function or initial value if exists.
								if no intial value is passed, then the first time the last value will be the first element.
							-current value: the elemenet that is being processed.
								If no initial value is passed, then the first time the current value will be the second element.
							-current index.
							-original array
	