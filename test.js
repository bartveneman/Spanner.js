require(["spanner.min"], function (spanner) {

    // Example 1: using an ID selector
    spanner( document.getElementById("example-1") );

    // Example 2: using a classname selector
    spanner( document.getElementById("example-2").getElementsByClassName("clazz") );

    // Example 3: using elements
    spanner( document.getElementById("example-3").getElementsByTagName("article") );

    // Example 4: using line-breaks
    spanner( document.getElementById("example-4") );

    // Example 5: using inline tags
    spanner( document.getElementById("example-5") );

    // Example 6: using inline tags
    spanner( document.getElementById("example-6") );

    // Example 8: breaking bad
    try {
        spanner( document.getElementById("non-existing-id") );
    } catch (e) {
        console.warn(e);
    }

});
