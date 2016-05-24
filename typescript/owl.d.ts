///<reference path="owl.Promise.d.ts"/>
///<reference path="owl.ajax.d.ts"/>
///<reference path="owl.history.d.ts"/>
///<reference path="owl.util.d.ts"/>
///<reference path="owl.Router.d.ts"/>
///<reference path="owl.Collection.d.ts"/>
///<reference path="owl.Controller.d.ts"/>
///<reference path="owl.Model.d.ts"/>
///<reference path="owl.View.d.ts"/>

declare module owl {
    /**
     * Request settings
     */
    interface RequestSettings {
        type: string;
        url: string;
        data: Object;
    }
    /**
     * Model options
     */
    interface ModelOptions {
        collection: Collection;
        collectionIndex: number;
    }
    /**
     * Router
     */
    interface Route {
        path?: string;
        resolves?: Array<Function>;
        callback?: Function;
        controller?: new () => Controller;
        action?: string;

        params?: Array<Object>;
        regexp?: RegExp;
    }
    /**
     * View options
     */
    interface ViewOptions {
        el?: Element;
        className?: string;
        events?: {[key: string]: string};
        template?: Function;
        model?: Model;
        collection?: Collection;
        controller?: Controller;
        
    }
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