import express from "express";
import { getProducts, addProducts } from "../controllers/product.controller";
import { addProductMiddleware } from "../middlewares/product.middlewares";

export const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", addProductMiddleware, addProducts);
