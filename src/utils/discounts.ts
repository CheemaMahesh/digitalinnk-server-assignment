import { CartItem, Discount, DiscountResult } from "../types";

const PRODUCT_IDS = {
  BREAD: "69cbe9de6d40ea5300f6a560",
  MILK: "69cbea056d40ea5300f6a563",
  CHEESE: "69cbea186d40ea5300f6a565",
  SOUP: "69cbea2c6d40ea5300f6a567",
  BUTTER: "69cbea3d6d40ea5300f6a569",
};

const PRICES = {
  BREAD: 1.1,
  MILK: 0.5,
  CHEESE: 0.9,
  SOUP: 0.6,
  BUTTER: 1.2,
};

export function calculateDiscounts(cart: CartItem[]): DiscountResult {
  const discounts: Discount[] = [];
  let totalDiscount = 0;

  const getQuantity = (productId: string) => {
    const item = cart.find((i) => i.productId === productId);
    return item?.quantity || 0;
  };

  // 1. Cheese BOGOF
  const cheeseQty = getQuantity(PRODUCT_IDS.CHEESE);
  if (cheeseQty >= 2) {
    const freeCheeseUnits = Math.floor(cheeseQty / 2);
    const cheeseDiscount = freeCheeseUnits * PRICES.CHEESE;
    discounts.push({
      name: "Cheese BOGOF",
      description: `Buy One Get One Free (${freeCheeseUnits} free)`,
      amount: cheeseDiscount,
    });
    totalDiscount += cheeseDiscount;
  }

  // 2. Soup & Bread Combo
  const soupQty = getQuantity(PRODUCT_IDS.SOUP);
  const breadQty = getQuantity(PRODUCT_IDS.BREAD);
  if (soupQty > 0 && breadQty > 0) {
    const discountedBreads = Math.min(soupQty, breadQty);
    const breadDiscount = discountedBreads * (PRICES.BREAD / 2);
    discounts.push({
      name: "Soup & Bread Combo",
      description: `Half price bread with soup (${discountedBreads} loaf${discountedBreads > 1 ? "s" : ""})`,
      amount: breadDiscount,
    });
    totalDiscount += breadDiscount;
  }

  // 3. Butter 1/3 Off
  const butterQty = getQuantity(PRODUCT_IDS.BUTTER);
  if (butterQty > 0) {
    const butterDiscount = butterQty * (PRICES.BUTTER / 3);
    discounts.push({
      name: "Butter 1/3 Off",
      description: `33% off butter (${butterQty} unit${butterQty > 1 ? "s" : ""})`,
      amount: butterDiscount,
    });
    totalDiscount += butterDiscount;
  }

  return { discounts, totalDiscount };
}
