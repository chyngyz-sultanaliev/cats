"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const cats_controllers_1 = __importDefault(require("./cats.controllers"));
const catsRoutes = (0, express_1.Router)();
catsRoutes.get("/", auth_middleware_1.authMiddleware, cats_controllers_1.default.getAll);
catsRoutes.get("/:id", auth_middleware_1.authMiddleware, cats_controllers_1.default.getOne);
catsRoutes.post("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, cats_controllers_1.default.create);
catsRoutes.put("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, cats_controllers_1.default.update);
catsRoutes.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, cats_controllers_1.default.remove);
exports.default = catsRoutes;
//# sourceMappingURL=cats.routes.js.map