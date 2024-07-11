import { AnyZodObject } from "zod";
import catchAsync from "./catchAsync";
import { NextFunction, Request, Response } from "express";

const validationRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validationRequest;
