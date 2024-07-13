"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./app/Routes"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
// connet module router
app.use("/api/v1/", Routes_1.default);
app.get("/", (req, res) => {
    res.send("Walcome to Sarker Fitness Equipment and Accessories!");
});
// Not Found Route
app.use(notFound_1.default);
exports.default = app;
