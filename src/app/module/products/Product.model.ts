import { model, Schema } from "mongoose";
import { TProduct } from "./product.interfact";

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      trim: true,
    },
    price: { type: Number, required: [true, "Price is required"] },
    description: { type: String, required: [true, "Description is required"] },
    images: { type: String, required: [true, "Image is required"] },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Product = model("Product", productSchema);

// name, price, description, images, category, and stock
