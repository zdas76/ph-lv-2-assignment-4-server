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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const QueryBuilders_1 = __importDefault(require("../../builder/QueryBuilders"));
const product_constant_1 = require("./product.constant");
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
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const productQuery = new QueryBuilders_1.default(Product_model_1.Product.find(), query)
        .search(product_constant_1.productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield productQuery.modelQuery;
    return result;
});
const getProductField = () => __awaiter(void 0, void 0, void 0, function* () {
    const reslt = yield Product_model_1.Product.find().select({ category: 1 });
    return reslt;
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
    getProductField,
};
