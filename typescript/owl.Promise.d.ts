/**
 * Promise should refer to any Promises/A+ library
 */
export class Promise<T> {
    constructor(resolve: Function, reject: Function);
    then(callback: Function): Promise<T>;
    catch(callback: Function): void;
}
