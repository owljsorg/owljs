declare namespace owl.util {
    /**
     * Clones an object
     */
    export function clone(object: Object, isRecursive: boolean): Object;

    /**
     * Extends and object
     */
    export function extend(firstObject: Object, secondObject: Object, isRecursive: boolean): Object;
}