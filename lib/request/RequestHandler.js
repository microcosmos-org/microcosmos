import ResponseHandler from '../response/ResponseHandler.js';
import Params from './Params.js';
import microActionStores from './action-stores.js';

export default class RequestHandler {
  /**
   * @param {ServerHttp2Stream} stream
   * @param {IncomingHttpHeaders} headers
   * @param {StreamDataHandler} streamDataHandler
   */
  constructor(stream, headers, streamDataHandler) {
    this.stream = stream;
    this.headers = headers;
    this.params = new Params(headers, streamDataHandler);
  }

  get responseHandler() {
    return new ResponseHandler(this.stream);
  }

  /**
   * Triggers Final Controller Action
   * @return {Promise<void>}
   */
  async handle() {
    if (this.isOptionsRequest) return void this.responseHandler.handleOptionsRequest();

    // map action store
    if (!this.actionsStore) {
      return void this.actionNotFound(`Action Store '${this.params.actionStore}' is not defined!`);
    }

    // map final action
    if (!this.actionsStore[this.params.action]) {
      return void this.actionNotFound(`Action ${this.params.action} is not defined within ` +
        `'${this.params.actionsStore}' Actions Instance!`);
    }

    // trigger action
    await this.actionsStore[this.params.action]();
  }

  /**
   * Checks if request is OPTIONS
   * @return {boolean}
   */
  get isOptionsRequest() {
    return this.headers[':method'] === 'OPTIONS';
  }

  /**
   * Checks if request is event-stream
   * @return {boolean}
   */
  get isEventStreamRequest() {
    return this.headers.accept === 'text/event-stream';
  }

  /**
   * @return {MicroAction|null} Maps ActionStore form Request
   * @private
   */
  get actionsStore() {
    if (this._actionsStore) return this._actionsStore;

    const MicroAction = microActionStores[this.params.actionStore];
    if (!MicroAction) return this._actionsStore = null;

    this._actionsStore = new MicroAction(this.stream, this.headers, this.params);
    return this._actionsStore;
  }

  /**
   * @param {string} message
   * @return {void}
   */
  actionNotFound(message) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(message);
    } else {
      this.responseHandler.endJSON({ data: 'Somebody is lost' }, 404);
    }
  }
}
