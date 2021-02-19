import { URL } from 'url';

export default class Params {
  /**
   * @param {IncomingHttpHeaders} headers
   * @param {StreamDataHandler} streamDataHandler
   */
  constructor(headers, streamDataHandler) {
    this.streamDataHandler = streamDataHandler;
    this.headers = headers;

    this.url = new URL(`https://${this.headers[':authority']}${this.headers[':path']}`);
    this.searchParams = this.url.searchParams;
    this.path = this.url.pathname;
    const [, actionStore, action, id] = this.path.split('/');
    this.actionStore = actionStore;
    this.action = action;
    this.id = id;
  }

  /**
   * @return {{}}
   */
  get data() {
    return this._data ||= this._getData();
  }

  /**
   * @return {{}|any}
   * @private
   */
  _getData() {
    if (this.streamDataHandler.body) {
      return JSON.parse(this.rawData);
    }
    return {};
  }

  /**
   * @return {string|number|HTMLElement|BodyInit|ReadableStream<Uint8Array>}
   */
  get rawData() {
    return this.streamDataHandler.body;
  }
}
