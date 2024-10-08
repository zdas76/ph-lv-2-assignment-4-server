import express from "express";
import { ProductController } from "./product.controllers";
import { ProductValidation } from "./product.validation";
import validationRequest from "../../middleware/validationRequest";

const router = express.Router();

router.post(
  "/",
  validationRequest(ProductValidation.createPorductValidation),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/category", ProductController.getProductsField);

router.get("/:id", ProductController.getProductsId);

router.put("/:id", ProductController.updateProductsId);

router.delete("/:id", ProductController.deletProductsId);

export const PorductRoutes = router;
