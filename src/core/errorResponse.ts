const { StatusCodes, Messages } = require("./httpStatusCode");

class BaseError extends Error {
  public status;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

class Api400Error extends BaseError {
  constructor(
    message = Messages.BAD_REQUEST,
    errors = [],
    status = StatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(message, status);
  }
}

class Api409Error extends BaseError {
  constructor(
    message = Messages.CONFLICT,
    errors = [],
    status = StatusCodes.CONFLICT,
    isOperational = true
  ) {
    super(message, status);
  }
}

class Api403Error extends BaseError {
  constructor(
    message = Messages.FORBIDDEN,
    errors = [],
    status = StatusCodes.FORBIDDEN,
    isOperational = true
  ) {
    super(message, status);
  }
}

class Api401Error extends BaseError {
  constructor(
    message = Messages.UNAUTHORIZED,
    errors = [],
    status = StatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(message, status);
  }
}

class Api500Error extends BaseError {
  constructor(
    message = Messages.INTERNAL_SERVER_ERROR,
    errors = [],
    status = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(message, status);
  }
}

class BusinessLogicError extends BaseError {
  constructor(
    message = Messages.INTERNAL_SERVER_ERROR,
    errors = [],
    status = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(message, status);
  }
}

class Api404Error extends BaseError {
  constructor(
    message = Messages.NOT_FOUND,
    errors = [],
    status = StatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, status);
  }
}

export {
  Api400Error,
  Api401Error,
  Api403Error,
  Api404Error,
  Api409Error,
  Api500Error,
  BusinessLogicError,
  BaseError,
};
