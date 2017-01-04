Exercise number 8 of javascript 30 series: HTML5 Canvas:
	CSS:
	HTML5:
		"canvas" element: it is used to draw graphics on a web page, on the fly, via javascript.
			Is only a container for graphics. You must use Javascript to actually draw graphics.
			It has several methos for drawing paths, boxes, circles, text, and adding images.
			To know more: http://www.w3schools.com/graphics/canvas_intro.asp
	JAVASCRIPT:
		http://mothereffinghsl.com/ is the rainbow nut you can select the color programatically.
		"canvas"
		"canvas.getContext": returns a draw context on te canvas, or null if the context identifier is not supported.
			ContextType:
				-"2d": leading to the creation of a CanvasRenderingContext2D object representing a two-dimesional rendering context.
					https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
				-"webgl":will create a WebGLRenderingContext object representing a three-dimensional rendering context. 
					This context is only available on browsers that implement WebGL version 1.
					https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
				-"webgl2": will create a WebGL2RenderingContext object representing a three-dimensional rendering context.
					This context is only available on browsers that implement WebGL version 2.
					https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext
				-"bitmaprenderer": will create a ImageBitmapRenderingContext which only provides functionality to replace the content of the canvas with a given ImageBitmap.
					https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext
		"hsl(hue, saturation, lightness) function": stands for hue, saturation and lightness.
			-hue: degree on the color wheel from 0 to 360.(0 red, 120 green, 240 blue).
			-saturation: a percentage value, 0% means a shade of gray and 100% is the full color. 
			-lightness: a percentage; 0% is black, 100% is white.