import microStreamer from '../sse/MicroStreamer.js';
import ResponseHandler from '../response/ResponseHandler.js';

export default class MicroAction extends ResponseHandler {
  /**
   * @param {ServerHttp2Stream} stream
   * @param {IncomingHttpHeaders} headers
   * @param {Params} params
   */
  constructor(stream, headers, params) {
    super(stream);
    this.headers = headers;
    this.params = params;
  }

  get streamer() {
    return microStreamer;
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
   *     return this.endTXT('world');
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
