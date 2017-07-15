export import ajax = require('./owl.ajax');
export import history = require('./owl.history');
export import util = require('./owl.util');
export {EventEmitter} from './owl.EventEmitter';
export {Router, IRoute} from './owl.Router';
export {Collection} from './owl.Collection';
export {Controller} from './owl.Controller';
export {Model, IModelOptions} from './owl.Model';
export {View, IViewOptions} from './owl.View';
export {AjaxError} from './owl.AjaxError';
export {Promise} from './owl.Promise';

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
