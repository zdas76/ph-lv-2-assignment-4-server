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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_model_1 = require("./Product.model");
const createProductToDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const checkPorduct = yield Product_model_1.Product.findOne({ name: payLoad.name });
    if (checkPorduct) {
        const quantity = checkPorduct.stock + payLoad.stock;
        const result = yield Product_model_1.Product.findByIdAndUpdate(checkPorduct._id, {
            stock: quantity,
        });
        return result;
    }
    else {
        const result = yield Product_model_1.Product.create(payLoad);
        return result;
    }
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.find();
    return result;
});
const getProductsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.findById(id);
    return result;
});
const updateProductsById = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.findByIdAndUpdate(id, payLoad);
    return result;
});
const deletProductsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductService = {
    createProductToDB,
    getAllProducts,
    getProductsById,
    updateProductsById,
    deletProductsById,
};
