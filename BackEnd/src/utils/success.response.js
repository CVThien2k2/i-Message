const Code = {
  OK: 200,
  CREATED: 201,
};
const StatusCode = {
  OK: "success",
  CREATED: "created",
};
class SuccessResponse {
  constructor({
    message,
    code = Code.OK,
    status = StatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? status : message;
    this.status = status;
    this.code = code;
    this.metadata = metadata;
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
    code = Code.CREATED,
    status = StatusCode.CREATED,
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
