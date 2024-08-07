import { model, Schema, SchemaType } from "mongoose";
import { TCheckProduct, TOrder } from "./order.interface";

const checkProductSchema = new Schema<TCheckProduct>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, require: true },
  itemTotal: { type: Number, require: true },
});

const orderSchema = new Schema<TOrder>(
  {
    checkOutProduct: [
      {
        type: checkProductSchema,
        required: [true, "Product is Required"],
      },
    ],
    customerEmail: { type: String },
    customerName: { type: String },
    deliveryAddress: { type: String },
    paymentType: { type: String },
    phoneNumber: { type: String },
    subTotal: { type: Number },
    discount: { type: Number },
    deliveryCost: { type: Number },
    totalAmount: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", orderSchema);
