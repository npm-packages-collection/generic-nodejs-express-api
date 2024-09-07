'use strict';

const { api } = require('../utils/api');

const error = (code = 404) => {
  let status;
  let description;
  switch (code) {
    case 400:
      status = 'Bad Request';
      description = 'The request was invalid.';
      break;
    case 401:
      status = 'Unauthorized';
      description = 'The request did not include an authentication token or the authentication token was expired.';
      break;
    case 402:
      status = 'Payment Required';
      description = 'Reserved for future use.';
      break;
    case 403:
      status = 'Forbidden';
      description = 'The client did not have permission to access the requested resource.';
      break;
    case 404:
      status = 'Not Found';
      description = 'The requested resource was not found.';
      break;
    case 405:
      status = 'Method Not Allowed';
      description = 'The HTTP method in the request was not supported by the resource.';
      break;
    case 406:
      status = 'Not Acceptable';
      description = 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.';
      break;
    case 407:
      status = 'Proxy Authentication Required';
      description = 'The client must first authenticate itself with the proxy.';
      break;
    case 408:
      status = 'Request Timeout';
      description = 'The server timed out waiting for the request.';
      break;
    case 409:
      status = 'Conflict';
      description = 'The request could not be completed due to a conflict.';
      break;
    case 410:
      status = 'Gone';
      description = 'The resource requested is no longer available and will not be available again.';
      break;
    case 411:
      status = 'Length Required';
      description = 'The request did not specify the length of its content, which is required by the requested resource.';
      break;
    case 412:
      status = 'Precondition Failed';
      description = 'The server does not meet one of the preconditions that the requester put on the request.';
      break;
    case 413:
      status = 'Payload Too Large';
      description = 'The request is larger than the server is willing or able to process.';
      break;
    case 414:
      status = 'URI Too Long';
      description = 'The URI provided was too long for the server to process.';
      break;
    case 415:
      status = 'Unsupported Media Type';
      description = 'The request entity has a media type which the server or resource does not support.';
      break;
    case 416:
      status = 'Range Not Satisfiable';
      description = 'The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.';
      break;
    case 417:
      status = 'Expectation Failed';
      description = 'The server cannot meet the requirements of the Expect request-header field.';
      break;
    case 418:
      status = 'I\'m a teapot';
      description = 'This code was defined in 1998 as one of the traditional IETF April Fools\' jokes, in RFC 2324.';
      break;
    case 421:
      status = 'Misdirected Request';
      description = 'The request was directed at a server that is not able to produce a response.';
      break;
    case 422:
      status = 'Unprocessable Entity';
      description = 'The request was well-formed but was unable to be followed due to semantic errors.';
      break;
    case 423:
      status = 'Locked';
      description = 'The resource that is being accessed is locked.';
      break;
    case 424:
      status = 'Failed Dependency';
      description = 'The request failed due to failure of a previous request.';
      break;
    case 426:
      status = 'Upgrade Required';
      description = 'The client should switch to a different protocol such as TLS/1.0.';
      break;
    case 428:
      status = 'Precondition Required';
      description = 'The origin server requires the request to be conditional.';
      break;
    case 429:
      status = 'Too Many Requests';
      description = 'The user has sent too many requests in a given amount of time ("rate limiting").';
      break;
    case 431:
      status = 'Request Header Fields Too Large';
      description = 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.';
      break;
    case 451:
      status = 'Unavailable For Legal Reasons';
      description = 'The server is denying access to the resource as a consequence of a legal demand.';
      break;
    case 500:
      status = 'Internal Server Error';
      description = 'The server has encountered a situation it does not know how to handle.';
      break;
    case 501:
      status = 'Not Implemented';
      description = 'The request method is not supported by the server and cannot be handled.';
      break;
    case 502:
      status = 'Bad Gateway';
      description = 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.';
      break;
    case 503:
      status = 'Service Unavailable';
      description = 'The server is not ready to handle the request.';
      break;
    case 504:
      status = 'Gateway Timeout';
      description = 'The server is acting as a gateway and cannot get a response in time.';
      break;
    case 505:
      status = 'HTTP Version Not Supported';
      description = 'The HTTP version used in the request is not supported by the server.';
      break;
    case 506:
      status = 'Variant Also Negotiates';
      description = 'Transparent content negotiation for the request results in a circular reference.';
      break;
    case 507:
      status = 'Insufficient Storage';
      description = 'The server is unable to store the representation needed to complete the request.';
      break;
    case 508:
      status = 'Loop Detected';
      description = 'The server detected an infinite loop while processing the request.';
      break;
    case 510:
      status = 'Not Extended';
      description = 'Further extensions to the request are required for the server to fulfill it.';
      break;
    case 511:
      status = 'Network Authentication Required';
      description = 'The client needs to authenticate to gain network access.';
      break;
    default:
      status = `Unknown Status: ${code}`;
      description = `No description for ${code}`;
      break;
  }
  return { code, status, description };
};

/*
 * GET
 */
router.get('/:code([3|4|5][0-9]{2})', api, (req, res) => {
  const { code, status, description } = error(Number(req.params.code));
  const response = {
    route: `/${req.params.code}`,
    error: { code, status, description },
  }
  if (req.api) {
    echo(res, {
      ...response
    });

    return
  }

  res.render(`${dir}/views/status.html`, {
    response
  });
});

module.exports = router;
