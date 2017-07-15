declare namespace owl {
    /**
     * Promise should refer to any Promises/A+ library
     */
    export class Promise {
        constructor(resolve: Function, reject: Function);
        then(callback: Function): Promise;
        catch(callback: Function): void;
    }
}