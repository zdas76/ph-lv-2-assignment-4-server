import mongoose from "mongoose";
import { TCheckProduct, TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../products/Product.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";

const crateOrderIntoDB = async (payLoad: TOrder) => {
  const session = await mongoose.startSession();
  const { checkOutProduct, ...remainingData } = payLoad;
  try {
    session.startTransaction();

    const updateProductQuantity = checkOutProduct.map(
      async (product) => await checkoutProductCheckAndLess(product, session)
    );

    if (updateProductQuantity) {
      const result = Order.create([payLoad, session]);
      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const orderService = {
  crateOrderIntoDB,
};

const checkoutProductCheckAndLess = async (
  payLoad: TCheckProduct,
  session: any
) => {
  const checkProduct = await Product.findById(payLoad.productId);
  if (!checkProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "This product not Found");
  }

  if (checkProduct.stock < payLoad.quantity) {
    throw new AppError(httpStatus.NOT_FOUND, "This product not available");
  }
  const newQuantity = checkProduct.stock - payLoad.quantity;

  const result = await Product.findByIdAndUpdate(
    checkProduct._id,
    {
      stock: newQuantity,
    },
    { new: true, session }
  );
  return result;
};
