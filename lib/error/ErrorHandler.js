import ResponseHandler from '../response/ResponseHandler.js';

export default class ErrorHandler {
  /**
   * @param {ServerHttp2Stream} stream
   * @param {Error} error
   */
  constructor(stream, error) {
    this.stream = stream;
    this.error = error;
  }

  get responseHandler() {
    return new ResponseHandler(this.stream);
  }

  handle() {
    if (this.stream && process.env.NODE_ENV !== 'production') {
      this.responseHandler.endJSON({ error: this.error.toString() }, 422);
    }
    console.error(this.error);
  }
}
