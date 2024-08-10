"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const Product_model_1 = require("../products/Product.model");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const crateOrderIntoDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { checkOutProduct } = payLoad, remainingData = __rest(payLoad, ["checkOutProduct"]);
    try {
        session.startTransaction();
        const updateProductQuantity = checkOutProduct.map((product) => __awaiter(void 0, void 0, void 0, function* () { return yield checkoutProductCheckAndLess(product, session); }));
        if (updateProductQuantity) {
            const result = order_model_1.Order.create([payLoad, session]);
            return result;
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.orderService = {
    crateOrderIntoDB,
};
const checkoutProductCheckAndLess = (payLoad, session) => __awaiter(void 0, void 0, void 0, function* () {
    const checkProduct = yield Product_model_1.Product.findById(payLoad.productId);
    if (!checkProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This product not Found");
    }
    if (checkProduct.stock < payLoad.quantity) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This product not available");
    }
    const newQuantity = checkProduct.stock - payLoad.quantity;
    const result = yield Product_model_1.Product.findByIdAndUpdate(checkProduct._id, {
        stock: newQuantity,
    }, { new: true, session });
    return result;
});
