export type CartItem = {
  productId: string;
  quantity: number;
};

export type Discount = {
  name: string;
  description: string;
  amount: number;
};

export type DiscountResult = {
  discounts: Discount[];
  totalDiscount: number;
};
