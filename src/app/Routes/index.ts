import express from "express";
import { PorductRoutes } from "../module/products/product.routes";
import { OrderRoutes } from "../module/orders/order.routes";

const router = express.Router();

const modulRoutes = [
  { path: "/products", route: PorductRoutes },
  { path: "/order", route: OrderRoutes },
];

modulRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
