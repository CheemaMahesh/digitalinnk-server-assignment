import { Request, Response, NextFunction } from "express";
import { productSchema } from "../validations/product.validation";

export const addProductMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validation = productSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validation.error.issues,
      });
    }

    req.body = validation.data;
    next();
  } catch (err) {
    console.error("Product middleware error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
