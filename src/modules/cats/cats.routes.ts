import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";
import catsControllers from "./cats.controllers";

const catsRoutes = Router();

catsRoutes.get("/", authMiddleware, catsControllers.getAll);
catsRoutes.get("/:id", authMiddleware, catsControllers.getOne);

catsRoutes.post("/", authMiddleware, adminMiddleware, catsControllers.create);
catsRoutes.put("/:id", authMiddleware, adminMiddleware, catsControllers.update);
catsRoutes.delete("/:id", authMiddleware, adminMiddleware, catsControllers.remove);

export default catsRoutes;
