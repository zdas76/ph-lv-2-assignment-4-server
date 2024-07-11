import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import AppError from "../Error/appEooro";
import handelZodError from "../Error/handelZorError";
import handleValidationError from "../Error/handleValidationError";
import handleCastError from "../Error/handelCastError";
import handleDuplicateError from "../Error/handleDuplicateError";

const globalErrorHandaler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const simplifedError = handelZodError(error);
    statusCode = simplifedError?.statusCode;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error?.name === "ValidationError") {
    const simplifedError = handleValidationError(error);
    statusCode = simplifedError?.statusCode;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error?.name === "CastError") {
    const simplifedError = handleCastError(error);
    statusCode = simplifedError?.statusCode;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error.code === 11000) {
    const simplifedError = handleDuplicateError(error);
    statusCode = simplifedError?.statusCode;
    message = simplifedError?.message;
    errorSources = simplifedError?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? error?.stack : null,
  });
};

export default globalErrorHandaler;
