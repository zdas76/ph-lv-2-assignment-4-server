"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = require("../module/products/product.routes");
const router = express_1.default.Router();
const modulRoutes = [{ path: "/products", route: product_routes_1.PorductRoutes }];
modulRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
