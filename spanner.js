/*jslint browser: true, continue: true */

window.spanner = (function (window, document) {
    "use strict";

    var /**
         * These tags are safe to use within spanning
         * @type {Array}
         * @private
         */
        _SAFE_TAGS = ["a", "abbr", "b", "bdo", "cite", "em", "dfn", "i", "kbd", "q", "samp", "small", "strong", "sub", "sup"],

        /**
         * Check if the given node is eligible for the spanning process;
         * @param  {Object} node The node that should be checked
         * @return {Object}      The node that has been approved or false if the node is not eligible
         * @private
         */
        _checkNode = function (node) {
            if (node.nodeType === 3) {
                // Node is a textNode. You're OK;
                return node;
            }

            if (_SAFE_TAGS.indexOf(node.nodeName.toLowerCase()) !== -1) {
                // Assuming we can use firstChild here, as nesting of 
                // these tags is rarely done, although it is valid HTML
                return node.firstChild;
            }

            return false;
        },

        /**
         * Wrap the given context in span elements
         * @param  {Object} context A single DOM node to wrap in span tags
         * @return {Object}         The wrapped node
         * @private
         */
        _wrap = function (context) {
            var nodes = context.childNodes,
                node,
                letters,
                wrapper = document.createDocumentFragment(),
                span,
                numLetters = 0,
                i,
                j;

            // Outer loop: iterates over node children to check if
            // they are of nodeType 3, which is a TextNode;
            for (i = 0; i < nodes.length; i += 1) {
                node = _checkNode(nodes[i]);

                if (!node) {
                    continue;
                }

                // Split the node's text into seperate characters;
                letters = node.nodeValue;

                // Inner loop: give each seperate letter/character
                // it's own wrapper span element and append that to
                // the documentFragment;
                for (j = 0; j < letters.length; j += 1) {
                    numLetters += 1;
                    span = document.createElement("span");
                    span.className = "char" + numLetters;
                    span.appendChild(document.createTextNode(letters.charAt(j)));
                    wrapper.appendChild(span);
                }

                // Replace the textnode with the wrapped substitute;
                node.parentNode.replaceChild(wrapper, node);
            }

        },

        /**
         * Starting point of the spanning process;
         * @param  {Object|Array} context The document element to apply lettering to
         * @return {Object|Array}         The document element that has lettering applied to
         * @private
         */
        spanner = function (context) {
            var numElements,
                i;

            // Check if there is a valid context/DOM node;
            if (!context) {
                throw new TypeError("Unable to perform lettering on context given.");
            }

            numElements = context.length;

            if (numElements) {
                // Iterate over multiple elements ...
                for (i = 0; i < numElements; i += 1) {
                    _wrap(context[i]);
                }
            } else {
                // ... or just a single one;
                _wrap(context);
            }

            return context;
        };

    return spanner;

}(window, document));
