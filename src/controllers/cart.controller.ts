import { Request, Response } from "express";
import cartItem from "../modules/cart.module";
import product from "../modules/product.module";
import { calculateDiscounts } from "../utils/discounts";

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const cartItemList = await cartItem.find({ quantity: { $gt: 0 } });
    if (cartItemList.length > 0) {
      res.status(200).json({
        success: true,
        message: "Cart Items Found",
        list: cartItemList,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Found Empty list",
      list: [],
    });
  } catch (err) {
    console.log("error in getCartItems", err);
    res
      .status(500)
      .json({ success: false, message: "error while fetching cart lsit" });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const cart = await cartItem.findOneAndUpdate(
      { productId: productId },
      { $inc: { quantity: 1 }, updatedAt: new Date() },
    );

    if (!cart) {
      await cartItem.create({
        productId,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        success: true,
        message: "Item added to cart",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Item quantity updated",
    });
  } catch (err) {
    console.log("err in addToCart", err);
    res.status(500).json({
      success: false,
      message: "error while adding item to cart lsit",
    });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const cart = await cartItem.findOneAndUpdate(
      { productId: productId },
      { $inc: { quantity: -1 }, updatedAt: new Date() },
    );
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Item quantity updated",
    });
  } catch (err) {
    console.log("err in removeFromCart", err);
    res.status(500).json({
      success: false,
      message: "error while removing item from cart",
    });
  }
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const cartItems = await cartItem.find({ quantity: { $gt: 0 } });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const products = await product.find();
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    let totalItems = 0;
    let totalAmount = 0;

    const cartData = cartItems.map((item) => {
      const prod = productMap.get(item.productId);
      const price = prod?.price || 0;

      totalItems += item.quantity;
      totalAmount += price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    const { discounts, totalDiscount } = calculateDiscounts(cartData);

    const finalTotal = totalAmount - totalDiscount;

    res.status(200).json({
      success: true,
      message: "Checkout calculated",
      data: {
        totalItems,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        discounts,
        totalDiscount: parseFloat(totalDiscount.toFixed(2)),
        finalTotal: parseFloat(finalTotal.toFixed(2)),
      },
    });
  } catch (err) {
    console.log("err in checkout", err);
    res.status(500).json({
      success: false,
      message: "Error during checkout",
    });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deleted = await cartItem.findOneAndDelete({ productId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item deleted",
    });
  } catch (err) {
    console.log("err in deleteCartItem", err);
    res.status(500).json({
      success: false,
      message: "Error while deleting cart item",
    });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    await cartItem.deleteMany({});

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (err) {
    console.log("err in clearCart", err);
    res.status(500).json({
      success: false,
      message: "Error while clearing cart",
    });
  }
};
