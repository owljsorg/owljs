import {Controller} from './owl.Controller';

/**
 * Router
 */
export interface IRoute {
    path?: string;
    resolves?: Array<Function>;
    callback?: Function;
    controller?: new () => Controller;
    action?: string;

    params?: Array<Object>;
    regexp?: RegExp;
}

/**
 * owl.Router
 */
export class Router {
    constructor(routes: Array<IRoute>, defaultRoute: IRoute, controller?: new () => Controller);

    /**
     * Opens page by path
     * @return {Promise<function>} Function to destroy controller
     */
    open(path: string): Promise<() => void>;

    /**
     * Calls resolve callback
     */
    resolve(route: IRoute): Promise<any>;

    /**
     * Runs the route
     * @return Function to destroy controller
     */
    run(path: string, route: IRoute, resolveResult: Array<any>): Function;

    /**
     * Adds a route
     */
    addRoute(route: IRoute): void;

    /**
     * Returns the route by path
     */
    getRoute(path: string): IRoute;

    /**
     * Sets default route
     */
    setDefaultRoute(route: IRoute): void;

    /**
     * Gets default route
     */
    getDefaultRoute(): IRoute;

    /**
     * Sets controller
     */
    setController(controller: new () => Controller): void;
    /**
     * Gets controller
     */
    getController(): new () => Controller;
}
