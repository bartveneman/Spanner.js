# Lettering: wrap your texts

Lettering is a simple way to wrap your text in `<span>`s for kerning, or other typographic effects.


## Usage
Lettering is registered as a global function, so all you have to do is call lettering with a selector as argument. If no valid selector is recognized, it throws an error, so be sure to place the function call inside a try-catch block.

Lettering wraps the letters in your text in `<span>`s with a class `char` appended by the number of the letter, for example `char1`. 
__Mind you__, counting starts at 1 instead of 0;

### Include lettering in your document
Preferrably at the bottom.

````html
<script src="lettering.js"></script>
````

### Call lettering function

````javascript
lettering( selector );
````


## Examples

### Using id's
Starting with the simplest of markups:

````html
<div id="kern-me-plz">text<div>
````

````javascript
lettering( document.getElementById("kern-me-plz") );
````

And it spits out something lik this:

````html
<div id="kern-me-plz">
	<span class="char1">t</span>
	<span class="char2">e</span>
	<span class="char3">x</span>
	<span class="char4">t</span>
<div>
````


### Using classnames

````html
<div class="clazz">text</div>
<div class="clazz">another</div>
````

````javascript
lettering( document.getElementsByClassName("clazz") );
````


### Using elements

````html
<div>text</div>
<div>another</div>
````

````javascript
lettering( document.getElementsByTagName("div") );
````

## jQuery-free!
You don't need jQuery for _everything_. No, really, you don't. ;)
