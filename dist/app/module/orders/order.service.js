"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const crateOrderIntoDB = (payLoad) => {
    const result = order_model_1.Order.create(payLoad);
    return result;
};
exports.orderService = {
    crateOrderIntoDB,
};
