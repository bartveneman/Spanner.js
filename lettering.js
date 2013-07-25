;(function(d) {

	var wrap = function (context) {

		var children = context.childNodes,
			node,
			letters,
			wrappedLetters = d.createDocumentFragment(),
			wrap,
			numWords = 0;

		// Outer loop: iterates over node children to check if
		// they are of nodeType 3, which is a TextNode;
		for (var i = 0; i < children.length; i += 1) {
			node = children[i];

			if (node.nodeType === 3) {
				numWords += 1;
				letters = node.nodeValue.split('');

				// Inner loop: give each seperate letter/character
				// it's own wrapper span element and append that to
				// the documentFragment;
				for (var j = 0; j < letters.length; j += 1) {
					wrap = d.createElement("span");
					wrap.className = "char" + numWords + "-" + (j + 1);
					wrap.appendChild(d.createTextNode(letters[j]));
					wrappedLetters.appendChild(wrap);
				}

				node.parentNode.replaceChild(wrappedLetters, node);
			}
		}

	};

	var lettering = function (context) {

		if (!context || typeof(context) !== "object" || context === null) {
			// Check if there is a valid context/dom node;
			throw "Unable to perform lettering on context given.";
		}

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


	if (typeof(exports) !== "undefined") {
		exports = lettering;
	} else {
		window.lettering = lettering;
	}

}(document));
