import microStreamer from '../sse/MicroStreamer.js';

export default class StreamCloseHandler {
  /**
   * @param {ServerHttp2Stream} stream
   */
  constructor(stream ) {
    this.stream = stream;
  }

  handle() {
    /* remove from streamer if it's subscribed to stage */
    if (this.stream.stage) {
      microStreamer.removeStream(this.stream);
    }

    this.stream.end();
  }
}
