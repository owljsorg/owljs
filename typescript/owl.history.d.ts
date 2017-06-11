declare module owl.history {
    /**
     * Makes request to the server
     */
    export function init(options: {
        baseUrl: string,
        basePath?: string
    }): void;

    /**
     * Gets an option
     */
    export function getOption(name: string): any;

    /**
     * Starts watching popstate event
     */
    export function start(): void;

    /**
     * Checks is history started
     */
    export function isStarted(): boolean;

    /**
     * Stop watching popstate event
     */
    export function stop(): void;

    /**
     * Adds new item to the navigation history
     */
    export function navigate(path: string): void;

    /**
     * Replaces current item in the navigation history
     */
    export function replace(path: string): void;

    /**
     * Gets current location
     */
    export function getLocation(): string;

    /**
     * Gets current hash
     */
    export function getHash(): string;

    /**
     * Sets hash
     */
    export function setHash(hash: string): void;

    /**
     * Opens the page by path
     */
    export function open(path: string): Promise;

    /**
     * Sets router by name
     */
    export function setRouter(path: string, router: Object): void;

    /**
     * Removes router by name
     */
    export function removeRouter(path: string): void;

    /**
     * Gets router by name
     */
    export function getRouter(path: void): Object;

    /**
     * Sets default router
     */
    export function setDefaultRouter(router: Object): void;

    /**
     * Gets default router
     */
    export function getDefaultRouter(): Object;

    /**
     * Sets resolve
     */
    export function setResolve(resolveName: string, resolveCallback: Function): void;

    /**
     * Removes resolve by name
     */
    export function removeResolve(resolveName: string): void;

    /**
     * Gets resolve by name
     */
    export function getResolve(resolveName: string): Function;

    /**
     * Adds event listener
     */
    export function on(event: string, listener: Function): void;

    /**
     * Removes event listener
     */
    export function off(event: string, listener: Function): void;

    /**
     * Trigger event
     */
    export function trigger(event: string): void;
}