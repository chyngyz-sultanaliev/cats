"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const cats_routes_1 = __importDefault(require("../modules/cats/cats.routes"));
const favorite_routes_1 = __importDefault(
  require("../modules/favorite/favorite.routes")
);
const globalRoutes = (0, express_1.Router)();
const corsConfig = {
  origin: ["http://localhost:3000"],
};
globalRoutes.use(
  "/auth",
  (0, cors_1.default)(corsConfig),
  auth_routes_1.default
);
globalRoutes.use(
  "/cats",
  (0, cors_1.default)(corsConfig),
  cats_routes_1.default
);
globalRoutes.use(
  "/favorite",
  (0, cors_1.default)(corsConfig),
  favorite_routes_1.default
);
exports.default = globalRoutes;
//# sourceMappingURL=index.js.map
