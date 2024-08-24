const { ReasonPhrases, StatusCodes } = require("http-status-codes");

//Lỗi phía client
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}
class TimeoutError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.REQUEST_TIMEOUT,
    statusCode = StatusCodes.REQUEST_TIMEOUT
  ) {
    super(message, statusCode);
  }
}
class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.CONFLICT,
    statusCode = StatusCodes.CONFLICT
  ) {
    super(message, statusCode);
  }
}
class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}
class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}
class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
//Server
class InternalServerError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}
module.exports = {
  ForbiddenError,
  ConflictRequestError,
  AuthFailureError,
  NotFoundError,
  ErrorResponse,
  InternalServerError,
  BadRequestError,
  TimeoutError
};
