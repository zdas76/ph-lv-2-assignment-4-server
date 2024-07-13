"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createPorductValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        price: zod_1.z.number(),
        description: zod_1.z.string(),
        images: zod_1.z.string(),
        category: zod_1.z.string(),
        stock: zod_1.z.number(),
    }),
});
exports.ProductValidation = {
    createPorductValidation,
};
