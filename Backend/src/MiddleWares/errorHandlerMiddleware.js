import apiError from "../Utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof apiError) {
    res
      .status(err.status)
      .json(new apiError(err.status, err.message, err.success));
  } else {
    res.status(500).json(new apiError(500, "Internal Server Error"));
    console.error("Error:", err);
  }
};

export default errorHandler;
// This error handler middleware captures errors thrown in the application,
// sends a JSON response with the error details.