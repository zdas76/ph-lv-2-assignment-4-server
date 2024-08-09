"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const checkProductSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, require: true },
    itemTotal: { type: Number, require: true },
});
const orderSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
