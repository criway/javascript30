Ajax type ahead, Six exeercise of javascript 30 series:
This exercise will display information about cities and its population, the source code is here:
https://raw.githubusercontent.com/iblancasa/GitHub-DataProcessor-Spain/master/cities.json
	CSS:
		"font-weigth": sets how thick or thin characters in text should be displayed.
			Values:
				-"normal": default.
				-"bold": thick characters.
				-"bolder": thicker characters.
				-"lighter": lighter characters.
				-"100/200/300/.../900": from thin to thick. 400=normal, 700=bold.
				-"initial"
				-"inherit"
		"outline": line that is drawn around elements (outside the borders) to make the element "stand out".
			Outline is not a part of the element's dimensions.
			Values:
				-"outline-color": specifies the color of the outline
				-"outline-style": specifies the style of the outline
				-"outline-width": specifies the width of the outline
				-"initial"
				-"inherit"
		"outline-color":
			Values:
				-"invert"
				-color
				-initial
				-inherit
		"outline-style"
			Values:
				-"none"
				-"hidden": hidden outline
				-"dotted"
				-"dashed" 
				-"solid"
				-"double"
				-"groove": 3D grooved outline. The effect depends on the outline-color value.
				-"ridge": 3D ridget outline. The effect depends on the outline-color value.
				-"inset": 3D inset outline. The effect depends on the outline-color value.
				-"outset"
				-"initial"
				-"inherit"
		"outline-width": different from the border property
			Values:
				-"medium"
				-"thin"
				-"thick"
				-length
				-"initial"
				-"inherit"
		"left": sets the left edge of an element to a unit to de left/right of the left edge of its nearest positioned ancestor.
		"z-index": secifies the stack order of an element. An element with greater stack order is always in front of an element with lower stack order.
			In other words, elements with z-index higher will be displayed in above others.
		"top": For absolutely positioned elements, the top property sets the top edge of an element;
		"perspective": defines how many pixels a 3D element is placed from the view. When defining the perspective property 
			for an element, it is the CHILD elements that get the perspective view, NOT the element itself.
		"justify-content": aligns the flexible container's items when the items do not use all available space on the main-axis (horizontally).	
			Values:
				-"flex-start": default. Items are positioned at the beginning of the container.
				-"flex-end": Items are positioned at the end of the container.
				-"center": Items are positioned at the center of the container.
				-"space-between": Items are positioned with space between lines.
				-"space-around": items are positioned with space before, between, and after the lines.
				-"initial"
				-"inherit"
	HTML:
	JAVASCRIPT:
		"fetch" returns a promise
		"promise" what is?: is an object used for asincronous computations. A promise can be in 3 states:
			-pending: initial state, not fulfilled or rejected.
			-fulfilled: success
			-rejected: failed
		"fetch.then()"
		spread operator "...": allow array parts to be initialized from an iterable expression.
		put a variable into a regular expression: we need to create a regular expression outside: new RegExp(this.value, 'gi')
		"RegExp(word, 'gi')"
		"string.match"
		"keyup event"