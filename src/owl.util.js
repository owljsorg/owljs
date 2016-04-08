(function(window, owl) {
    function clone(object) {
        var cloneObject = {};
        Object.keys(object).forEach(function(key) {
            cloneObject[key] = object[key];
        });
        return cloneObject;
    }

    function extend(firstObject, secondObject) {
        var resultObject;
        if (!firstObject) {
            firstObject = {};
        }
        if (!secondObject) {
            secondObject = {};
        }
        resultObject = clone(firstObject);
        Object.keys(secondObject).forEach(function(key) {
            resultObject[key] = secondObject[key];
        });
        return resultObject;
    }

    owl.util = {
        clone: clone,
        extend: extend
    };
}(window, window.owl));