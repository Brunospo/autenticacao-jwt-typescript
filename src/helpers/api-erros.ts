export class ApiError extends Error {
  public readonly statusCode: number

  constructor(public msg: string, statusCode: number) {
    super(msg)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends ApiError {
  constructor(public msg: string) {
    super(msg, 400)
  }
}

export class NotFoundError extends ApiError {
  constructor(public msg: string) {
    super(msg, 404)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(public msg: string) {
    super(msg, 401)
  }
}