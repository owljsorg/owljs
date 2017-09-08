(function(window, owl) {
    /**
     * owl.util
     */
    owl.util = {
        /**
         * Clones an object
         * @param {object} object
         * @param {boolean} isRecursive
         * @return {object}
         */
        clone: function(object, isRecursive) {
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

            copy = {};
            Object.keys(object).forEach(function(key) {
                copy[key] = isRecursive ? that.clone(object[key], isRecursive) : object[key];
            });
            return copy;
        },
        /**
         * Extends and object
         * @param {object} firstObject
         * @param {object} secondObject
         * @param {boolean} isRecursive
         * @return {object}
         */
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
        },
        /**
         * Makes query string from data
         * @param {object} data
         * @return {string}
         */
        toQueryString: function(data) {
            var query = [],
                key;
            if (!(typeof data === 'object')) {
                return '';
            }
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }
            return '?' + query.join('&');
        },
        deprecated: function(messsage) {

        }
    };
}(window, owl));