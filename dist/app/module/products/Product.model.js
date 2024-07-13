"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
// name, price, description, images, category, and stock
