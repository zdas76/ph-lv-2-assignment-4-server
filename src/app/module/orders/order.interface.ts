import { Types } from "mongoose";

export type TCheckProduct = {
  productId: Types.ObjectId;
  quantity: number;
  itemTotal: number;
};

export type TOrder = {
  checkOutProduct: [TCheckProduct];
  customerEmail: string;
  customerName: string;
  deliveryAddress: string;
  paymentType: string;
  phoneNumber: string;
  subTotal: number;
  discount: number;
  deliveryCost: number;
  totalAmount: number;
};
