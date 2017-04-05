(function(window, owl) {
    /**
     * owl.AjaxError
     * @param {XMLHttpRequest} xhr
     * @constructor
     */
    function AjaxError(xhr) {
        this.message = 'Respond with ' + xhr.status;
        this.status = xhr.status;
        this.text = xhr.responseText;
        try {
            this.data = JSON.parse(xhr.responseText);
        } catch (e) {
            this.data = {};
        }

        // Deprecated
        this.responseText = this.text;
        this.json = this.data;
    }

    AjaxError.prototype = new Error();

    /**
     * Gets response message
     * @returns {string}
     */
    AjaxError.prototype.getMessage = function() {
        return this.message;
    };

    /**
     * Gets response status
     * @returns {number}
     */
    AjaxError.prototype.getStatus = function() {
        return this.status;
    };

    /**
     * Gets response text
     * @returns {string}
     */
    AjaxError.prototype.getText = function() {
        return this.text;
    };

    /**
     * Gets response data
     * @returns {object}
     */
    AjaxError.prototype.getData = function() {
        return this.data;
    };

    owl.AjaxError = AjaxError;
})(window, owl);