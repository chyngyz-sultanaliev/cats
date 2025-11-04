import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { cat: true },
    });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении избранного" });
  }
};

const addFavorite = async (req: Request, res: Response) => {
  const { catId } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const newFavorite = await prisma.favorite.create({
      data: { userId, catId },
    });
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении в избранное" });
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { favoriteId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    if (!favoriteId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "ID кота и user обязателен" });
    }
    await prisma.favorite.delete({
      where: { id: favoriteId, userId },
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({ error: "Избранное не найдено" });
  }
};
export default { getAll, addFavorite, removeFavorite };
