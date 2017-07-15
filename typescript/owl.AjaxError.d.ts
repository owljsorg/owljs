/**
 * owl.AjaxError
 */
export class AjaxError extends Error {
    constructor(xhr: XMLHttpRequest);
    /**
     * Gets response message
     */
    getMessage(): string;

    /**
     * Gets response status
     */
    getStatus(): number;

    /**
     * Gets response text
     */
    getText(): string;

    /**
     * Gets response data
     */
    getData(): Object;
}
