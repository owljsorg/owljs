(function(window, owl) {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype = {
        /**
         * Adds event listener
         * @param {string} event Event name
         * @param {function} listener Event listener
         */
        on: function(event, listener) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
        },
        /**
         * Removes event listener
         * @param {string?} event Event name
         * @param {function?} listener Event listener
         */
        off: function(event, listener) {
            if (!event) {
                this.events = [];
            } else if (!listener) {
                delete this.events[event];
            } else if (this.events[event]) {
                this.events[event] = this.events[event].filter(function(currentListener) {
                    return currentListener !== listener;
                });
            }
        },
        /**
         * Trigger single event
         * @param {string} event Event name
         * @param {any?} payload Payload
         */
        emit: function(event, payload) {
            var that = this;
            setTimeout(function() {
                var listeners = that.events[event];
                if (listeners) {
                    listeners.forEach(function(listener) {
                        listener(payload);
                    });
                }
            }, 0);
        },
        /**
         * Deprecated, use emit instead
         * Triggers single event
         * @param {string} event Event name
         */
        triggerSingle: function(event) {
            this.emit(event);
        },
        /**
         * Triggers events
         * @param {string} event Event name
         * @param {array} subEvents Sub events array
         */
        trigger: function(event, subEvents) {
            var that = this;
            this.triggerSingle(event);
            if(subEvents && subEvents instanceof Array) {
                subEvents.forEach(function(subEvent) {
                    that.triggerSingle(event + ':' + subEvent);
                });
            } else if (subEvents) {
                this.triggerSingle(event + ':' + subEvents);
            }
        }
    };
    owl.EventEmitter = EventEmitter;
})(window, owl);