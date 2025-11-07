"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const cats_routes_1 = __importDefault(require("../modules/cats/cats.routes"));
const favorite_routes_1 = __importDefault(require("../modules/favorite/favorite.routes"));
const globalRoutes = (0, express_1.Router)();
const allowedOrigins = [
    "https://next-cat-delta.vercel.app",
    "http://localhost:3000",
];
globalRoutes.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS")
        return res.sendStatus(200);
    next();
});
globalRoutes.use("/auth", auth_routes_1.default);
globalRoutes.use("/cats", cats_routes_1.default);
globalRoutes.use("/favorite", favorite_routes_1.default);
exports.default = globalRoutes;
//# sourceMappingURL=index.js.map