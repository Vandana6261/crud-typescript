class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    // Set the error name to "AppError"
    this.name = this.constructor.name;

    // Preserve the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;