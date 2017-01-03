Exercise number seven of Javascript30 series: Array Cardio 2
	CSS:
	HTML:
	JAVASCRIPT:
		"Array.prototype.some(callback[, thisArg])": verifies if any element in the array pass the test inside the function
			calls callback function to every element in the array UNTIL some value pass the test and the callback function
			returns true. Only for elements in array with assigned values.
			some() does not modifies the array-
			Parameters:
				callback:
					-currentValue
					-index
					-array
				thisArgs
		"Array.prototype.every(callback[, thisArg])": verifies if all elementes in array pass the test.
			calls the callback for every element in array until any returns FALSE. Only for elements with assigned values.
			Parameters:
				callback:
					-currentValue
					-index
					-array
				thisArgs
		"Array.prototype.find(callback[, thisArg])": Returns the first element that pass the test in callback function.
			If no element pass the test, undefined is returned.
			calls the callback for every element in array until any returns FALSE. Only for elements with assigned values.
			Parameters:
				callback:
					-currentValue
					-index
					-array
				thisArgs"
		"Array.prototype.findIndex(callback[, thisArg])": Returns the index of the first element that pass the test in callback function.
		"Array.prototype.splice(start, deleteCount[, item1[, item2[, ...]]])": modifies the array content deleting or adding new elements.
			Parameters:
				start: index to start changing the array, if it is greater, then the start point will be the length of the array.
					if it is negative, it will start to count elements from the end. Count starts with 0.
				deleteCount: number of elements in array to eliminate. If no value is set, then deleteCount will be arr.length-start.
				item1, item2: elements to add to array.