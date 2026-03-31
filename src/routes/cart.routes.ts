import express from "express";
import {
  getCartItems,
  addToCart,
  removeFromCart,
  checkout,
  deleteCartItem,
  clearCart,
} from "../controllers/cart.controller";
import {
  addToCartMiddleware,
  removeFromCartMiddleware,
} from "../middlewares/cart.middlewares";
export const cartRouter = express.Router();

cartRouter.get("/", getCartItems);
cartRouter.patch("/add", addToCartMiddleware, addToCart);
cartRouter.patch("/remove", removeFromCartMiddleware, removeFromCart);
cartRouter.get("/checkout", checkout);
cartRouter.delete("/clear", clearCart);
cartRouter.delete("/:productId", deleteCartItem);
