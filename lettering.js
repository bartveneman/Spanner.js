;(function(d) {

	var wrap = function (context) {

		var children = context.childNodes,
			node,
			textNode,
			textValue,
			spannedWords,
			letters,
			spannedLetter,
			letter,
			spannedLetters = d.createDocumentFragment(),
			numWords = 0;

		for (var i = 0; i < children.length; i += 1) {
			node = children[i];

			if (node.nodeType === 3) {
				numWords += 1;
				textValue = node.nodeValue;
				letters = textValue.split('');

				for (var j = 0; j < letters.length; j += 1) {
					var num = j + 1;
					var span = d.createElement("span");
					span.className = "char" + numWords + "-" + num;
					span.appendChild(d.createTextNode(letters[j]));
					spannedLetters.appendChild(span);
				}

				node.parentNode.replaceChild(spannedLetters, node);
			}
		}

	};

	var lettering = function (context) {

		if (!context || typeof(context) !== "object" || context === null) {
			throw "Unable to perform lettering on context given.";
		}

		if (context.length && context.length > 1) {
			for (var i = 0; i < context.length; i += 1) {
				wrap(context[i]);
			}
		} else {
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
