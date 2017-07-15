declare namespace owl {
    /**
     * owl.EventEmitter
     */
    export class EventEmitter {
        constructor();

        /**
         * Adds event listener
         */
        on(event: string, listener: Function): void;

        /**
         * Removes event listener
         */
        off(event?: string, listener?: Function): void;

        /**
         * Deprecated: use emit instead
         * Emits single event
         */
        emit(event: string, payload?: any) : void;

        /**
         * Deprecated: use emit instead
         * Emits single event
         */
        triggerSingle(event: string): void;

        /**
         * Triggers events
         */
        trigger(event: string, subEvents?: Array<string>): void;
    }
}