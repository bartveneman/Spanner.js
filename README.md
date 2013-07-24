# Lettering: wrap your texts

Lettering is a simple way to wrap your text in `<span>`s for kerning, or other typographic effects.

## Usage
Lettering is registered as a global function, so all you have to do is call lettering with a selector as argument. If no valid selector is recognized, it throws an error, so be sure to place the function call inside a try-catch block.

## Examples
Include lettering in your document:

````markup
<script src="lettering.js"></script>
````

Starting with the simplest of markups:

````markup
<div id="kern-me-plz">text<div>
````

Calling the function...

````javascript
lettering( document.getElementById("kern-me-plz") );
````

... and it spits some results to your document:

````markup
<div id="kern-me-plz">
	<span class="char1">t</span>
	<span class="char2">e</span>
	<span class="char3">x</span>
	<span class="char4">t</span>
<div>
````
