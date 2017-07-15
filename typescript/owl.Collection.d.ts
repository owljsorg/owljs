declare namespace owl {
    /**
     * owl.Collection
     */
    export class Collection extends EventEmitter {
        constructor(data: Array<Object>, options: Object);
        /**
         * Gets data from the server
         */
        fetch(query?: Object): Promise;

        /**
         * Removes models from collection
         */
        clear(): void;

        /**
         * Sets collection data
         */
        setData(data?: Array<Object>): void;

        /**
         * Gets collection data
         */
        getData(): Array<Object>;

        /**
         * Gets collection models
         */
        getModels(): Array<Model>;

        /**
         * Gets collection length
         */
        getLength(): number;

        /**
         * Gets model by index
         */
        get(index: number): owl.Model;

        /**
         * Updates collection internal data value based on index
         * In case when index is not defined updates whole collection
         */
        update(index?: number): void;
    }
}