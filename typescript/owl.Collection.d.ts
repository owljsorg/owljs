import {Model} from './owl.Model';
import {EventEmitter} from './owl.EventEmitter';

/**
 * Collection options
 */
export interface ICollectionOptions {
    url: string;
    model: typeof Model;
}

/**
 * owl.Collection
 */
export class Collection<T> extends EventEmitter {
    protected url: string;

    constructor(data: T[], options: ICollectionOptions);
    /**
     * Gets data from the server
     */
    fetch(query?: Object): Promise<T[]>;

    /**
     * Removes models from collection
     */
    clear(): void;

    /**
     * Sets collection data
     */
    setData(data?: T[]): void;

    /**
     * Gets collection data
     */
    getData(): T[];

    /**
     * Gets collection models
     */
    getModels(): Model[];

    /**
     * Gets collection length
     */
    getLength(): number;

    /**
     * Gets model by index
     */
    get(index: number): Model;

    /**
     * Updates collection internal data value based on index
     * In case when index is not defined updates whole collection
     */
    update(index?: number): void;
}
