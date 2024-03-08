const { StatusCodes } = require("./httpStatusCode");

class SuccessResponse {
  private message;
  private status;
  private data;
  private options;
  constructor({
    message = "",
    status = StatusCodes.OK,
    data = {},
    options = {},
  }) {
    this.message = message;
    this.status = status;
    this.data = data;
    this.options = options;
  }

  send(res: any, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message = "", data = {}, options = {} }) {
    super({ message, data, options });
  }
}

class Create extends SuccessResponse {
  constructor({ message = "", data = {}, options = {} }) {
    super({ message, status: StatusCodes.CREATED, data, options });
  }
}

const CREATED = (res: any, message: string, data: any, options = {}) => {
  new Create({
    message,
    data,
    options,
  }).send(res);
};

const OK = (res: any, message: string, data: any, options = {}) => {
  new Ok({
    message,
    data,
    options,
  }).send(res);
};

module.exports = {
  OK,
  CREATED,
};
