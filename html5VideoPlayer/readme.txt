Exercise 11 of Javascript30 series
-CSS
-HTML:
	<video>
		-Attributes:
			->autoplay: video start as soon as it is ready
			->controls: specifies that video controls should be displayed
			->height
			->loop: video will start over again, every time it is finished
			->muted
			->poster (url): specifies an image to be shown while video is downloading, or until the user hits the play button
			->preload (auto/metadata/none): Specifies if and how the author thinks the video should be loaded when page loads
			->src (url): 
			->witdh			
			
	[data-<attrName>]: some attribute values you can add to any html element. to access in javascript, use element.dataset."attrName"
-JAVASCRIPT:
	-element.dataset: property allows access, both in reading and writing mode, to all the custom data attributes (data-*) set on the element.
		The name of a custom data attribute in HTML begins with data-
		The name of a custom data attribute in Javascript is the name of the same HTML attribute but in camelCase and with no dashes, dots, etc.