declare namespace owl {
    /**
     * owl.View
     */
    export class View {
        protected el: Element;
        protected elements: {[key: string]: any};
        protected model: Model;
        protected collection: Collection;
        protected template: Function;
        protected controller: Controller;

        constructor(options: ViewOptions);

        /**
         * Gets element matching selector
         */
        getMatchingElement(element: Element, selector: string): Element;

        /**
         * Update events and element
         */
        update(el?: Element): void;

        /**
         * Update events
         */
        updateEvents(el: Element): void;

        /**
         * Update element
         */
        updateElements(el: Element): void;

        /**
         * Calls event listener
         */
        callEventListener(method: string, element: Element, event: Event): void;

        /**
         * Calls template function and adds result to element
         */
        render(data?: Object): void;

        /**
         * Removes element content
         */
        remove(): void;

        /**
         * Finds element in current component by selector
         */
        find(selector: string): Element;

        /**
         * Finds all elements in current component by selector
         */
        findAll(selector: string): NodeList;

        /**
         * Gets DOM element related to the view
         */
        getEl(): Element;
    }
}