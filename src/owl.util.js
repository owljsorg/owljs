(function(window, owl) {
    owl.util = {
        clone: function(object, recursive) {
            var that = this,
                copy;

            if (null === object || typeof object !== 'object') {
                return object;
            }

            if (object instanceof Date) {
                copy = new Date();
                copy.setTime(object.getTime());
                return copy;
            }

            if (object instanceof Array) {
                copy = [];
                object.forEach(function(element, index) {
                    copy[index] = that.clone(element);
                });
                return copy;
            }

            if (object instanceof Object) {
                copy = {};
                Object.keys(object).forEach(function(key) {
                    copy[key] = recursive ? that.clone(object[key], recursive) : object[key];
                });
                return copy;
            }

            return null;
        },
        extend: function(firstObject, secondObject, isRecursive) {
            var that = this,
                result = this.clone(firstObject, true);

            Object.keys(secondObject).forEach(function(key) {
                if (typeof result[key] === 'object' && result[key] !== null && isRecursive) {
                    result[key] = that.extend(result[key], secondObject[key], isRecursive);
                } else {
                    result[key] = secondObject[key];
                }
            });

            return result;
        }
    };
}(window, owl));