import RequestHandler from '../request/RequestHandler.js';
import ErrorHandler from '../error/ErrorHandler.js';
import StreamCloseHandler from './StreamCloseHandler.js';
import StreamDataHandler from './StreamDataHandler.js';

export default class StreamHandler {
  /**
   * @param {ServerHttp2Stream} stream
   * @param {IncomingHttpHeaders} headers
   */
  constructor(stream, headers) {
    /* initialize handlers */
    this.streamDataHandler = new StreamDataHandler();
    this.streamCloseHandler = new StreamCloseHandler(stream);
    /* register handlers */
    stream.on('close', () => this.streamCloseHandler.handle());
    stream.on('data', chunk => this.streamDataHandler.handle(chunk));
    stream.on('error', error => new ErrorHandler(stream, error).handle());
    stream.on('end', () => {
      new RequestHandler(stream, headers, this.streamDataHandler).handle()
          .catch((error) => stream.emit('error', error));
    });
  }
}
