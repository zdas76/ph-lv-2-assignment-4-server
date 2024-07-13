"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controllers_1 = require("./product.controllers");
const product_validation_1 = require("./product.validation");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const router = express_1.default.Router();
router.post("/", (0, validationRequest_1.default)(product_validation_1.ProductValidation.createPorductValidation), product_controllers_1.ProductController.createProduct);
router.get("/", product_controllers_1.ProductController.getAllProducts);
router.get("/:id", product_controllers_1.ProductController.getProductsId);
router.patch("/:id", product_controllers_1.ProductController.updateProductsId);
router.delete("/:id", product_controllers_1.ProductController.deletProductsId);
exports.PorductRoutes = router;
