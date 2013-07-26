/*jslint continue: true */
(function (d) {
    "use strict";

    var
        /**
         * Check if the given node is eligible for the lettering process;
         * @param  {DOM node} node [The node that should be checked]
         * @return {DOM node}      [The node that has been approved or false if the node is not eligible]
         */
        checkNode = function (node) {
            var
                tagName = node.nodeName.toLowerCase(),
                safeTags = ["em", "strong", "i", "b", "a", "small", "abbr", "cite", "dfn", "kbd", "samp", "bdo", "q", "span", "sub", "sup"];

            if (node.nodeType === 3) {
                // Node is a textNode. You're OK;
                return node;
            }

            if (safeTags.indexOf(tagName) !== -1) {
                // Assuming we can use firstChild here, as nesting of these
                // tags is rarely done. #fingerscrossed;
                return node.firstChild;
            }

            return false;
        },

        /**
         * Wrap the given context in span elements
         * @param  {DOM node} context [A single DOM node to wrap in span tags]
         * @return {DOM node}         [The wrapped node]
         */
        wrap = function (context) {
            var
                nodes = context.childNodes,
                nodesLength = nodes.length,
                node,
                letters,
                lettersLength,
                wrapper = d.createDocumentFragment(),
                span,
                numLetters = 0,
                i,
                j;

            // Outer loop: iterates over node children to check if
            // they are of nodeType 3, which is a TextNode;
            for (i = 0; i < nodesLength; i += 1) {
                node = checkNode(nodes[i]);

                if (!node) {
                    // not a node
                    continue;
                }

                // Split the node's text into separate characters;
                letters = node.nodeValue.split('');
                lettersLength = letters.length;

                // Inner loop: give each seperate letter/character
                // its own wrapper span element and append that to
                // the documentFragment;
                for (j = 0; j < lettersLength; j += 1) {
                    numLetters += 1;
                    span = d.createElement("span");
                    span.className = "char" + numLetters;
                    span.appendChild(d.createTextNode(letters[j]));
                    wrapper.appendChild(span);
                }

                // Replace the textnode with the wrapped substitute;
                node.parentNode.replaceChild(wrapper, node);
            }
        },

        /**
         * Starting point of the lettering process;
         * @param  {DOM node(s)} context [The document element to apply lettering to]
         * @return {DOM node(s)}         [The document element that has lettering applied to]
         */
        lettering = function (context) {
            var
                numElements,
                i;

            // Check if there is a valid context/DOM node;
            if (!context || typeof context  !== "object" || context === null) {
                throw "Unable to perform lettering on context given.";
            }

            numElements = context.length;

            if (numElements && numElements > 1) {
                // Iterate over multiple elements ...
                for (i = 0; i < numElements; i += 1) {
                    wrap(context[i]);
                }
            } else {
                // ... or just a single one;
                wrap(context);
            }

            return context;
        };

    // Make lettering globally accessible;
    if (typeof exports  !== "undefined") {
        exports = lettering;
    } else {
        window.lettering = lettering;
    }

}(document));
