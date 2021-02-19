export default {
  // Informational 1xx
  continue: 100,
  switchingProtocols: 101,
  processing: 102,
  requestUriIsTooLong: 122,

  // Success 2xx
  ok: 200,
  created: 201,
  accepted: 202,
  partialInformation: 203,
  noResponse: 204,
  resetContent: 205,
  partialContent: 206,
  multiStatus: 207,
  alreadyReported: 208,
  imUsed: 209,

  // Redirection 3xx
  moved: 301,
  found: 302,
  method: 303,
  notModified: 304,
  useProxy: 305,
  switchProxy: 306,
  temporaryRedirect: 307,
  permanentRedirect: 308,

  // Client errors 4xx
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionRequired: 412,
  requestEntityTooLarge: 413,
  requestUriIsTooLarge: 414,
  unsupportedMediaType: 415,
  unprocessableEntity: 422,

  // Server errors 5xx
  internalServerError: 500,
  notImplemented: 501,
  gatewayTimeout: 503,
};
