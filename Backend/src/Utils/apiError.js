class apiError extends Error {
  constructor(status, message, error = [], stack) {
    super(message);
    this.status = status || 500;
    this.message = message || "Internal Server Error";
    this.error = error;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default apiError;
