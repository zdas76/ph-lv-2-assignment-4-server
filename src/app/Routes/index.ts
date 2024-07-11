import express from "express";
import { PorductRoutes } from "../module/products/product.routes";

const router = express.Router();

const modulRoutes = [{ path: "/products", route: PorductRoutes }];

modulRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
