(function(window, owl) {
    function clone(object) {
        var cloneObject = {};
        Object.keys(object).forEach(function(key) {
            var value = object[key];
            if (typeof value === 'Object') {
                cloneObject[key] = clone(value);
            } else {
                cloneObject[key] = value;
            }
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
            var value = secondObject[key];
            if(typeof value === 'Object') {
                resultObject[key] = extend(firstObject[key], value);
            } else {
                resultObject[key] = value;
            }
        });
        return resultObject;
    }

    owl.util = {
        clone: clone,
        extend: extend
    };
}(window, window.owl));