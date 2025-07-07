import apiError from "../Utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof apiError) {
    res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        errors: err.errors,
        success: err.success,
        data: err.data,
      });
  } else {
    res.status(500).json(new apiError(500, "Internal Server Error"));
    console.error("Error:", err);
  }
};

export default errorHandler;
// This error handler middleware captures errors thrown in the application,
// sends a JSON response with the error details.
