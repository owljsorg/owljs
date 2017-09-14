import {Model} from './owl.Model';
import {EventEmitter} from './owl.EventEmitter';

/**
 * Collection options
 */
export interface ICollectionOptions<M> {
    url: string;
    model: M;
}

/**
 * owl.Collection
 */
export class Collection<I, M> extends EventEmitter {
    protected url: string;

    constructor(data: I[], options: ICollectionOptions<M>);
    /**
     * Gets data from the server
     */
    fetch(query?: Object): Promise<I[]>;

    /**
     * Removes models from collection
     */
    clear(): void;

    /**
     * Sets collection data
     */
    setData(data?: I[]): void;

    /**
     * Gets collection data
     */
    getData(): I[];

    /**
     * Gets collection models
     */
    getModels(): M[];

    /**
     * Gets collection length
     */
    getLength(): number;

    /**
     * Gets model by index
     */
    get(index: number): M;

    /**
     * Updates collection internal data value based on index
     * In case when index is not defined updates whole collection
     */
    update(index?: number): void;
}
