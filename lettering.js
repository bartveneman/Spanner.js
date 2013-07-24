;(function() {

	/**
	 * The lettering method. Calls the wrapInner method and sorts out whether to call 
	 * it a single time or multiple, depending on the selector that is given.
	 * @param  {DOM node} context  [The DOM Node(s) to apply lettering to]
	 * @return {DOM node}          [The DOM node(s) that was/were given as an argument]
	 */
	var lettering = function (context) {

		if (!context || context === null) {
			throw "Invalid or non-existing DOM node for selector " + selector;
		}

		if (context.length && context.length > 1) {
			for (var i = 0; i < context.length; i += 1) {
				wrapInner(context[i]);
			}
		} else {
			wrapInner(context);
		}

		return context;

	};

	/**
	 * Do the wrapping for a single DOM-node
	 * @param  {DOM node} context  [The DOM node to apply the lettering to]
	 * @return {DOM node}          [The initial context]
	 */
	var wrapInner = function (context) {

		var text = context.innerHTML.split(''),
			replacer = [];

		// Foreach character in the text, wrap it in a <span>;
		for (var i = 0; i < text.length; i += 1) {
			replacer[i] = "<span class='char" + (i + 1) + "'>" + text[i] + "</span>";
		}

		context.innerHTML = replacer.join('');
		return context;

	};


	if (typeof(exports) !== "undefined") {
		exports = lettering;
	} else {
		window.lettering = lettering;
	}

}());
