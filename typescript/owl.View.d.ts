import {Collection} from './owl.Collection';
import {Model} from './owl.Model';
import {Controller} from './owl.Controller';

/**
 * View options
 */
export interface IViewOptions {
    el?: Element;
    className?: string;
    events?: {[key: string]: string};
    template?: Function;
    model?: Model;
    collection?: Collection;
    controller?: Controller;

}

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

    constructor(options: IViewOptions);

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
