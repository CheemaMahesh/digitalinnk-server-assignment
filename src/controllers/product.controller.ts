import { Request, Response } from "express";
import Product from "../modules/product.module";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      message: "Products found",
      products,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", success: false });
  }
};

export const addProducts = async (req: Request, res: Response) => {
  try {
    const { name, currency, price } = req.body;
    const product = await Product.create({ name, currency, price });
    res.status(201).json({
      message: "Product created successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.error("Product controller error:", error);
    res.status(500).json({
      error: "Failed to add product",
      success: false,
    });
  }
};
