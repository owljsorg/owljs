declare module owl {
    /**
     * owl.Model
     */
    export class Model {
        constructor(data: Object, options: Object);
        /**
         * Gets attribute by name
         */
        get(name: string): any;

        /**
         * Sets attribute value by name
         */
        set(name: string, value: any): void;

        /**
         * Gets data from the server
         */
        fetch(query: Object): Promise;

        /**
         * Removes all attributes from the model
         */
        clear(): void;

        /**
         * Saves a model to database
         */
        save(query: Object): Promise;

        /**
         * Updates local data and saves model
         */
        update(data: Object, query: Object): Promise;

        /**
         * Partially updates model
         */
        patch(data: Object, query: Object): Promise;

        /**
         * Removes a model
         */
        destroy(query: Object): Promise;

        /**
         * Gets models data
         */
        getData(): Object;

        /**
         * Gets model collection
         */

        getCollection(): Collection;
        /**
         * Adds event listener
         */
        on(event: string, listener: Function): void;

        /**
         * Removes event listener
         */
        off(event: string, listener: Function): void;

        /**
         * Trigger single event
         */
        triggerSingle(event: string): void;

        /**
         * Triggers events
         */
        trigger(event: string, subEvents: Array<string>);
    }
}