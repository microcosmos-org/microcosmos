import httpStatuses from './HttpStatuses.js';

export default class ResponseHandler {
  /**
   * @param {ServerHttp2Stream} stream
   */
  constructor(stream) {
    this.stream = stream;
    this.responseHeaders = {
      'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    };
    this.status = httpStatuses;
  }

  setHeader(name, value) {
    this.responseHeaders[name] = value;
  }

  sendHeaders(status = this.status.ok) {
    this.responseHeaders[':status'] ||= status;
    this.stream.respond(this.responseHeaders);
  }

  options() {
    this.sendHeaders();
    this.stream.end();
  }

  json(json, status = this.status.ok) {
    this.responseHeaders['Content-Type'] = 'application/json';
    this.sendHeaders(status);
    this.stream.end(JSON.stringify(json));
  }

  rawJSON(json, status) {
    this.responseHeaders['Content-Type'] = 'application/json';
    this.sendHeaders(status);
    this.stream.end(json);
  }

  txt(response) {
    this.stream.end(response);
  }

  streamDATA(data) {
    this.stream.write(`data: ${data}\n\n`);
  }

  /* automatic responses */
  success() {
    this.sendHeaders();
    this.stream.end();
  }

  unauthorized(error = 'Not authorized!') {
    this.json({ error }, this.status.unauthorized);
  }

  unprocessableEntity(error = 'Unprocessable Entity!') {
    this.json({ error }, this.status.unprocessableEntity);
  }

  notFound(error = 'Not found') {
    this.json({ error }, this.status.notFound);
  }
}
