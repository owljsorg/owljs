///<reference path="owl.Promise.d.ts"/>
///<reference path="owl.ajax.d.ts"/>
///<reference path="owl.history.d.ts"/>
///<reference path="owl.Collection.d.ts"/>

declare module owl {
    /**
     * Defines a module by builder.
     * Builder should return an object.
     */
    export function define(name: string, builder: Function): void;
    /**
     * Requires a module.
     * First time will call builder and will return an object created by builder.
     * Next calls will return already created object.
     */
    export function require(name: string): Object;
}