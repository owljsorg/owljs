import {EventEmitter} from './owl.EventEmitter';
import {Collection} from './owl.Collection';

/**
 * Model options
 */
export interface IModelOptions {
    url: string;
    collection?: Collection;
    collectionIndex?: number;
}

/**
 * owl.Model
 */
export class Model<I> extends EventEmitter {
    protected url: string;
    protected idAttribute: string;

    constructor(data: I, options: IModelOptions);
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
    fetch(query?: Object): Promise<I>;

    /**
     * Removes all attributes from the model
     */
    clear(): void;

    /**
     * Saves a model to database
     */
    save(query?: Object): Promise<Object>;

    /**
     * Updates local data and saves model
     */
    update(data: I, query?: Object): Promise<Object>;

    /**
     * Partially updates model
     */
    patch(data: I | object, query?: Object, path?: String): Promise<Object>;

    /**
     * Removes a model
     */
    destroy(query?: Object): Promise<Object>;

    /**
     * Gets model data
     */
    getData(): I;

    /**
     * Sets model data
     */
    setData(data: I): void;

    /**
     * Gets model collection
     */
    getCollection(): Collection;

    /**
     * Gets model collection index
     */
    getCollectionIndex(): number;

    /**
     * Parses ID attribute from URL
     */
    parseIdAttribute(url: string): string;
}
