;(function(d) {

	var wrap = function (context) {
		"use strict";

		var nodes = context.childNodes,
			node,
			letters,
			wrapper = d.createDocumentFragment(),
			wrap,
			numWords = 0;

		// Outer loop: iterates over node children to check if
		// they are of nodeType 3, which is a TextNode;
		for (var i = 0; i < nodes.length; i += 1) {
			node = nodes[i];

			if (checkNode(node) === false) {
				continue;
			} else {
				node = checkNode(node);
			}

			numWords += 1;

			// Split the node's text into seperate characters;
			letters = node.nodeValue.split('');

			// Inner loop: give each seperate letter/character
			// it's own wrapper span element and append that to
			// the documentFragment;
			for (var j = 0; j < letters.length; j += 1) {
				wrap = d.createElement("span");
				wrap.className = "char" + numWords + "-" + (j + 1);
				wrap.appendChild(d.createTextNode(letters[j]));
				wrapper.appendChild(wrap);
			}

			// Replace the textnode with the wrapped substitute;
			node.parentNode.replaceChild(wrapper, node);
		}

	},

	checkNode = function (node) {
		"use strict";

		var tagName = node.nodeName;

		if (node.nodeType === 3) {
			// Node is a textNode. You're OK;
			return node;
		} else if (tagName === "EM" || tagName === "STRONG" || tagName === "I" || tagName === "B") {
			// Assuming we can use firstChild here, as nesting of these
			// tags is rarely done. #fingerscrossed;
			return node.firstChild;
		} else {
			return false;
		}
	},

	lettering = function (context) {
		"use strict";

		if (!context || typeof(context) !== "object" || context === null) {
			// Check if there is a valid context/DOM node;
			throw "Unable to perform lettering on context given.";
		}

		// Method calling logic, as @davatron5000 puts it;
		if (context.length && context.length > 1) {
			// Iterate over multiple elements ...
			for (var i = 0; i < context.length; i += 1) {
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
