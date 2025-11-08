"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const cats_routes_1 = __importDefault(require("../modules/cats/cats.routes"));
const favorite_routes_1 = __importDefault(require("../modules/favorite/favorite.routes"));
const globalRoutes = (0, express_1.Router)();
const corsConfig = {
    origin: ["http://localhost:3000", "https://next-cat-chi.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
globalRoutes.use((0, cors_1.default)(corsConfig));
globalRoutes.use("/auth", auth_routes_1.default);
globalRoutes.use("/cats", cats_routes_1.default);
globalRoutes.use("/favorite", favorite_routes_1.default);
exports.default = globalRoutes;
//# sourceMappingURL=index.js.map