declare module owl {
    /**
     * owl.Controller
     */
    export class Controller {
        constructor();

        /**
         * Init a controller
         * Will be called after navigate to new page
         * If action is defined in route it will be called instead of init
         */
        init(): void;

        /**
         * Removes all data created by controller
         * Will be called before navigate to new page
         */
        destroy(): void;
    }
}