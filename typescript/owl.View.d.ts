declare module owl {
    /**
     * owl.View
     */
    export class View {
        constructor(options: ViewOptions);

        /**
         * Gets element matching selector
         */
        getMatchingElement(element: HTMLElement, selector: string): HTMLElement;

        /**
         * Update events and element
         */
        update(el: HTMLElement): void;

        /**
         * Update events
         */
        updateEvents(el: HTMLElement): void;

        /**
         * Update element
         */
        updateElements(el: HTMLElement): void;

        /**
         * Calls event listener
         */
        callEventListener(method: string, element: HTMLElement, event: Event): void;

        /**
         * Calls template function and adds result to element
         */
        render(data: Object): void;

        /**
         * Removes element content
         */
        remove(): void;

        /**
         * Finds element in current component by selector
         */
        find(selector: string): HTMLElement;

        /**
         * Finds all elements in current component by selector
         */
        findAll(selector: string): NodeList;

        /**
         * Gets DOM element related to the view
         */
        getEl(): HTMLElement;
    }
}