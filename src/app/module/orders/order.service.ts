import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const crateOrderIntoDB = (payLoad: TOrder) => {
  const result = Order.create(payLoad);
  return result;
};

export const orderService = {
  crateOrderIntoDB,
};
