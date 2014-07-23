# Spanner.js: wrap your text

Spanner.js is a simple way to wrap your text in `<span>`s for kerning, or other typographic effects. Spanner.js wraps the letters in your text in `<span>`s with a class `char` appended by the number of the letter, for example `char1`. __Mind you__, counting starts at 1 instead of 0;

Spanner.js is a jQuery-free rip-off from @davatron5000 's [lettering.js](https://github.com/davatron5000/Lettering.js).

## Usage
Spanner.js is registered as a global function, so all you have to do is call lettering with a valid selector as argument. If no valid selector is recognized, it throws an error, so be sure to place the function call inside a try-catch block.


Include spanner in your document, preferrably at the bottom:

````html
<script src="spanner.js"></script>
````

And call the lettering function from your application:

````javascript
try {
	spanner( selector );
} catch (e) {
	console.warn(e); // element not found or not eligible;
}
````

## Examples

### Using a basic selector

````html
<div class="clazz">text</div>
<div class="clazz">another</div>
````

This example shows spanner being used in a try-catch block.

````javascript
spanner( document.getElementsByClassName("clazz") );
````

Spanner gives you this:

````html
<div class="clazz">
	<span class="char1">t</span>
	<span class="char2">e</span>
	<span class="char5">x</span>
	<span class="char4">t</span>
</div>
<div class="clazz">
	<span class="char1">a</span>
	<span class="char2">n</span>
	<span class="char3">o</span>
	<span class="char4">t</span>
	<span class="char5">h</span>
	<span class="char6">e</span>
	<span class="char7">r</span>
</div>
````

### Using inline tags
Spanner.js is able to recognize inline tags one level deep. So you can use `<em>`, `<i>`, `<b>`, `<strong>` or even `a` inside the element you want to apply lettering to. Supported tags:

* a 
* abbr
* b 
* bdo
* cite
* dfn
* em 
* i 
* kbd
* q
* samp
* small
* strong 
* sub
* sup

````html
<div id="kern-me-plz">Going <em>nuts</em> <strong>here</strong> <a href="">dude</a></div>
````

````javascript
spanner( document.getElementById("kern-me-plz") );
````

Output:

````html
<div id="kern-me-plz">
	<span class="char1">G</span>
	<span class="char2">o</span>
	<span class="char3">i</span>
	<span class="char4">n</span>
	<span class="char5">g</span>
	<span class="char6"></span> 
	<em>
		<span class="char7">n</span>
		<span class="char8">u</span>
		<span class="char9">t</span>
		<span class="char10">s</span>
	</em>
	<span class="char11"></span>
	<strong>
		<span class="char12">h</span>
		<span class="char13">e</span>
		<span class="char14">r</span>
		<span class="char15">e</span>
	</strong>
	<span class="char16"></span>
	<a href="">
		<span class="char17">d</span>
		<span class="char18">u</span>
		<span class="char19">d</span>
		<span class="char20">e</span>
	</a>
</div>
````

### Using the Line Break Element
Spanner.js is capable of dealing with the Line Break Element. It splits up the words before and after the break element and it continues the char count.

````html
<div id="example3">text<br/>here<br/>plz</div>
````

````javascript
spanner( document.querySelector("#example-3") );
````

Spanner.js will do the counting for you:

````html
<div id="example-3">
	<span class="char1">t</span>
	<span class="char2">e</span>
	<span class="char3">x</span>
	<span class="char4">t</span>
	<br>
	<span class="char5">h</span>
	<span class="char6">e</span>
	<span class="char7">r</span>
	<span class="char8">e</span>
	<br>
	<span class="char9">p</span>
	<span class="char10">l</span>
	<span class="char11">z</span>
</div>
````

## Known issues
The one thing Spanner.js can't handle is, er, `<span>`s. It will not split the text inside the span, but leave the whole tag alone. You could use it as a feature: using a span inside your element will prevent it from having Spanner applied ;-)

## Test
Tests are available in the [test page](test.html).

## Credits
Thanks to [Phil Green](https://github.com/ShirtlessKirk) for pointing out _many_ jslint errors and some really useful optimalisations.
Many kudos to Dave Rupert for creating the original version, called [Lettering.js](https://github.com/davatron5000/Lettering.js).

## jQuery-free!
You don't need jQuery for _everything_. No, really, you don't. ;)
