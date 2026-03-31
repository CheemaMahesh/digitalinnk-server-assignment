import { Request, Response, NextFunction } from "express";
import {
  addToCartSchema,
  removeFromCartSchema,
} from "../validations/cart.validation";

export const addToCartMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = addToCartSchema.safeParse(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.issues,
    });
    return;
  }
  next();
};

export const removeFromCartMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = removeFromCartSchema.safeParse(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.issues,
    });
    return;
  }
  next();
};
