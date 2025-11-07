import { Router } from "express";
import cors from "cors";
import authRoutes from "../modules/auth/auth.routes";
import catsRoutes from "../modules/cats/cats.routes";
import favoriteRoutes from "../modules/favorite/favorite.routes";
const globalRoutes = Router();

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
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

globalRoutes.use("/auth", authRoutes);
globalRoutes.use("/cats", catsRoutes);
globalRoutes.use("/favorite", favoriteRoutes);
export default globalRoutes;
