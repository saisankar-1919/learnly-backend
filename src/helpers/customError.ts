export class CustomError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name; // Set the error name to CustomError
  }
}
