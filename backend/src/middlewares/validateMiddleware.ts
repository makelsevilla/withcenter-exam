import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// Define the valid sources for extracting data
type Source = "body" | "query" | "params";

// request validate middleware
const validateMiddleware =
  (schema: ZodSchema<any>, source: Source = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];
      const result = await schema.safeParseAsync(data); // Use safeParseAsync for async validation

      if (!result.success) {
        res.status(400).json({ errors: result.error.format() });
        return;
      }

      req.validated = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };

export default validateMiddleware;
