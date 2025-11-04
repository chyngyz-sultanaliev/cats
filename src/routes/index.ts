import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import catsRoutes from "../modules/cats/cats.routes";
import favoriteRoutes from "../modules/favorite/favorite.routes";
const globalRoutes = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};

globalRoutes.use("/auth",cors(corsConfig), authRoutes);
globalRoutes.use("/cats",cors(corsConfig), catsRoutes);
globalRoutes.use("/favorite",cors(corsConfig), favoriteRoutes);
export default globalRoutes;
