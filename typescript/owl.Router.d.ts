declare module owl {
    /**
     * owl.Router
     */
    export class Router {
        constructor(routes: Array<Route>, defaultRoute: Route, controller: Object);

        /**
         * Opens page by path
         */
        open(path: string): void;

        /**
         * Calls resolve callback
         */
        resolve(route: Route): boolean;

        /**
         * Runs the route
         */
        run(path: string, route: Route): void;

        /**
         * Adds a route
         */
        addRoute(route: Route): void;

        /**
         * Returns the route by path
         */
        getRoute(path: string): Route;

        /**
         * Sets default route
         */
        setDefaultRoute(route: Route): void;

        /**
         * Gets default route
         */
        getDefaultRoute(): Route;

        /**
         * Sets controller name
         */
        setController(controller: string): void;
        /**
         * Gets controller name
         */
        getController(): string;
    }
}