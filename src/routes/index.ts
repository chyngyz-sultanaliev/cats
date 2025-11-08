import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import catsRoutes from "../modules/cats/cats.routes";
import favoriteRoutes from "../modules/favorite/favorite.routes";

const globalRoutes = Router();

const corsConfig = {
  origin: ["http://localhost:3000", "https://next-cat-chi.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

globalRoutes.use(cors(corsConfig));

globalRoutes.use("/auth", authRoutes);
globalRoutes.use("/cats", catsRoutes);
globalRoutes.use("/favorite", favoriteRoutes);

export default globalRoutes;
