export class HttpError extends Error {
  constructor(public code: number, message: string, public type: string = "error", public result: string = "Client Error") {
    super(message)
    this.name = "HttpError"
  }
}   