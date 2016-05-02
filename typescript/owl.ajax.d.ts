declare module owl.ajax {
    interface RequestSettings {
        type: string;
        url: string;
        data: Object;
    }
    /**
     * Makes request to the server
     */
    export function request(settings: RequestSettings);

    /**
     * Sets a header for each request
     */
    export function setHeader(key: string, value: string);

    /**
     * Removes a header
     */
    export function removeHeader(key: string);

    /**
     * Default event error listener
     */
    export function error(xhr: XMLHttpRequest);

    /**
     * Makes query string from data
     */
    export function toQueryString(data: Object);

    /**
     * Stringify an object
     */
    export function toJsonString(data: Object);
}