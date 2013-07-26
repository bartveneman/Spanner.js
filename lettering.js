;(function(d) {

	/**
	 * Wrap the given context in span elements
	 * @param  {DOM node} context [A single DOM node to wrap in span tags]
	 * @return {DOM node}         [The wrapped node]
	 */
	var wrap = function (context) {
		"use strict";

		var nodes = context.childNodes,
			node,
			letters,
			wrapper = d.createDocumentFragment(),
			wrap,
			numLetters = 0;

		// Outer loop: iterates over node children to check if
		// they are of nodeType 3, which is a TextNode;
		for (var i = 0; i < nodes.length; i += 1) {
			node = nodes[i];

			if (checkNode(node) === false) {
				continue;
			} else {
				node = checkNode(node);
			}

			// Split the node's text into seperate characters;
			letters = node.nodeValue.split('');

			// Inner loop: give each seperate letter/character
			// it's own wrapper span element and append that to
			// the documentFragment;
			for (var j = 0; j < letters.length; j += 1) {
				numLetters += 1;
				wrap = d.createElement("span");
				wrap.className = "char" + numLetters;
				wrap.appendChild( d.createTextNode(letters[j]) );
				wrapper.appendChild(wrap);
			}

			// Replace the textnode with the wrapped substitute;
			node.parentNode.replaceChild(wrapper, node);
		}

	},

	/**
	 * Check if the given node is eligible for the lettering process;
	 * @param  {DOM node} node [The node that should be checked]
	 * @return {DOM node}      [The node that has been approved or false if the node is not eligible]
	 */
	checkNode = function (node) {
		"use strict";

		var tagName = node.nodeName.toLowerCase(),
			safeTags = ["em", "strong", "i", "b", "a", "small", "abbr", "cite", "dfn", "kbd", "samp", "bdo", "q", "sub", "sup"];

		if (node.nodeType === 3) {
			// Node is a textNode. You're OK;
			return node;
		} else if (safeTags.indexOf(tagName) !== -1) {
			// Assuming we can use firstChild here, as nesting of these
			// tags is rarely done. #fingerscrossed;
			return node.firstChild;
		} else {
			return false;
		}
	},

	/**
	 * Starting point of the lettering process;
	 * @param  {DOM node(s)} context [The document element to apply lettering to]
	 * @return {DOM node(s)}         [The document element that has lettering applied to]
	 */
	lettering = function (context) {
		"use strict";

		var numElements;

		// Check if there is a valid context/DOM node;
		if (!context || typeof(context) !== "object" || context === null) {
			throw "Unable to perform lettering on context given.";
		}

		numElements = context.length;

		if (numElements && numElements > 1) {
			// Iterate over multiple elements ...
			for (var i = 0; i < numElements; i += 1) {
				wrap(context[i]);
			}
		} else {
			// ... or just a single one;
			wrap(context);
		}

		return context;
	};


	// Make lettering globally accessible;
	if (typeof(exports) !== "undefined") {
		exports = lettering;
	} else {
		window.lettering = lettering;
	}

}(document));
