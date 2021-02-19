import ResponseHandler from '../response/ResponseHandler.js';
import { initRedis } from './redis-configuration.js';

/**
 * @singleton
 */
class MicroStreamer {
  constructor() {
    this.subscribedStages = {};
    this.stageStreams = {};
    this.subscriber = null;
    this.publisher = null;
  }

  /**
   * Add message listener to subscriber
   */
  configSubscriber() {
    this.subscriber.on('message', (stage, data) => this.handleMessage(stage, data));
  }

  /**
   * @param {string} stage
   * @param {string} data
   */
  handleMessage(stage, data) {
    const streams = this.stageStreams[stage];
    if (!streams) return;

    for (let i = 0, ii = streams.length; i < ii; i++) {
      const stream = this.stageStreams[stage][i];
      this.streamData(stream, data);
    }
  }

  /**
   * @param {string} stage namespace
   * @param {ServerHttp2Stream} stream
   */
  join(stage, stream) {
    this.respond(stream);

    stream.stage = stage;

    this.stageStreams[stage] ||= [];
    this.stageStreams[stage].push(stream);

    if (!this.subscribedStages[stage]) {
      this.subscribedStages[stage] = true;
      this.subscriber.subscribe(stage);
    }
  }

  /**
   * Sends Headers for stream
   * @param {ServerHttp2Stream} stream
   */
  respond(stream) {
    const responder = new ResponseHandler(stream);
    responder.setHeader('Content-Type', 'text/event-stream');
    responder.sendHeaders();
  }

  streamData(stream, data) {
    return new ResponseHandler(stream).streamDATA(data);
  }

  emitEvent(stage, data) {
    // noinspection JSUnresolvedFunction
    this.publisher.publish(stage, data);
  }

  removeStream(stream) {
    const stageStreams = this.stageStreams[stream.stage];
    stageStreams.splice(stageStreams.indexOf(stream), 1);

    if (stageStreams.length === 0) {
      this.subscribedStages[stream.stage] = false;
      this.subscriber.unsubscribe(stream.stage);
    }
  }
}

const microStreamer = new MicroStreamer();

initRedis().then((result) => {
  const { subscriber, publisher } = result;
  microStreamer.subscriber = subscriber;
  microStreamer.publisher = publisher;
  microStreamer.configSubscriber();
});

export default microStreamer;
