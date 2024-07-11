import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handelZodError = (error: ZodError): TGenericErrorResponse => {
  let errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 4000;
  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};

export default handelZodError;
