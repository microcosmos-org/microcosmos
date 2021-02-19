import http2 from 'http2';
/* Micro Lib */
import ErrorHandler from '../error/ErrorHandler.js';
import StreamHandler from '../stream/StreamHandler.js';

export default class MicroServer {
  constructor(options) {
    const { cert, key, ...serverOptions } = options;
    this.options = serverOptions;
    this.port = options.port || 3000;
    this.server = http2.createSecureServer({ cert, key });
  }

  /**
   * Setup Server Listeners
   */
  listen() {
    this.server.on('stream', (stream, headers) => new StreamHandler(stream, headers));
    this.server.on('error', (error) => new ErrorHandler(null, error).handle());

    console.log(`listening: https://localhost:${this.options.port}`);

    this.server.listen(this.options.port);
  }
}
