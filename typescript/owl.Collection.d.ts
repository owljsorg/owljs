declare module owl {
    /**
     * owl.Collection
     */
    export class Collection {
        constructor(data: Object, options: Object);
        /**
         * Gets data from the server
         */
        fetch(query: Object): Promise;

        /**
         * Removes models from collection
         */
        clear(): void;

        /**
         * Sets collection data
         */
        setData(data: Array<Object>): void;

        /**
         * Gets collection data
         */
        getData(): Array<Object>;

        /**
         * Gets collection models
         */
        getModels(): Array<Object>;

        /**
         * Gets collection length
         */
        getLength(): number;

        /**
         * Adds event listener
         */
        on(event: string, listener: Function): void;

        /**
         * Removes event listener
         */
        off(event: string, listener: Function): void;

        /**
         * Triggers event
         */
        trigger(event: string): void;
    }
}