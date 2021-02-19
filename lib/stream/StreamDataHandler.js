export default class StreamDataHandler {
  constructor() {
    this.body = '';
  }

  /**
   * @param {Buffer | string} chunk
   */
  async handle(chunk) {
    this.body += chunk.toString();
  }
}
