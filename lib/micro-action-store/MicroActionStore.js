import microStreamer from '../sse/MicroStreamer.js';
import ResponseHandler from '../response/ResponseHandler.js';

export default class MicroActionStore {
  /**
   * @param {ServerHttp2Stream} stream
   * @param {IncomingHttpHeaders} headers
   * @param {Params} params
   */
  constructor(stream, headers, params) {
    this.stream = stream;
    this.headers = headers;
    this.params = params;
  }

  get streamer() {
    return microStreamer;
  }

  get render() {
    return this._render ||= new ResponseHandler(this.stream);
  }

  /**
   * Matching first part of the path.
   * @example
   * Class UserActions extends MicroAction {
   *   static get routeName() {
   *    return 'users';
   *   }
   *
   *   hello() {
   *     return this.render.txt('world');
   *   }
   * }
   *
   * GET '/users/hello' => 'world'
   *
   * @return {string}
   * @abstract
   */
  static get routeName() {
    throw new Error('static get routeName is not implemented');
  }
}
