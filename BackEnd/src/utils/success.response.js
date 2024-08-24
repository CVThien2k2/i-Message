const {
	ReasonPhrases,
	StatusCodes
} = require('http-status-codes');

class SuccessResponse {
  constructor({
    message,
    code = StatusCodes.OK,
    status = ReasonPhrases.OK,
    metadata = {},
  }) {
    this.message = !message ? status : message;
    this.status = status;
    this.code = code;
    this.data = metadata;
  }
  send(res, headers = {}) {
    return res.status(this.code).json(this);
  }
}
class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}
class CREATED extends SuccessResponse {
  constructor({
    message,
    code = StatusCodes.CREATED,
    status = ReasonPhrases.CREATED,
    metadata,
  }) {
    super({ message, code, status, metadata });
  }
}

module.exports = {
  OK,
  CREATED,
  SuccessResponse,
};
