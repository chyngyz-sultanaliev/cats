import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const cats = await prisma.cats.findMany({
      include: {
        favorites: userId
          ? {
              where: { userId },
              select: { id: true },
            }
          : false,
      },
    });

    const catsWithFavorite = cats.map((cat) => ({
      ...cat,
      isFavorite: cat.favorites ? cat.favorites.length > 0 : false,
      favorites: undefined,
    }));

    res.status(200).json({ success: true, cats: catsWithFavorite });
  } catch (error) {
    console.error("Ошибка getAll:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res
        .status(400)
        .json({ success: false, message: "ID кота обязателен" });
    }

    const cat = await prisma.cats.findUnique({
      where: { id: catId },
    });

    if (!cat) {
      return res.status(404).json({ success: false, message: "Кот не найден" });
    }

    res.status(200).json({ success: true, cat });
  } catch (error) {
    console.error("Ошибка getOne:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, color, age, paws, price, image, sale } = req.body;

    if (!name || !color || !age || !paws || !price) {
      return res.status(400).json({
        success: false,
        message: "Все обязательные поля должны быть заполнены",
      });
    }

    const newCat = await prisma.cats.create({
      data: { name, color, age, paws, price, image, sale },
    });

    res.status(201).json({ success: true, cat: newCat });
  } catch (error) {
    console.error("Ошибка create:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res
        .status(400)
        .json({ success: false, message: "ID кота обязателен" });
    }

    const { name, color, age, paws, price, sale, image } = req.body;

    const cat = await prisma.cats.findUnique({ where: { id: catId } });
    if (!cat)
      return res.status(404).json({ success: false, message: "Кот не найден" });

    const updatedCat = await prisma.cats.update({
      where: { id: catId },
      data: { name, color, age, paws, price, sale, image },
    });

    res.status(200).json({ success: true, cat: updatedCat });
  } catch (error) {
    console.error("Ошибка update:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const catId = req.params.id;
    if (!catId) {
      return res
        .status(400)
        .json({ success: false, message: "ID кота обязателен" });
    }

    const cat = await prisma.cats.findUnique({ where: { id: catId } });
    if (!cat)
      return res.status(404).json({ success: false, message: "Кот не найден" });

    await prisma.cats.delete({ where: { id: catId } });

    res.status(200).json({ success: true, message: "Кот удалён" });
  } catch (error) {
    console.error("Ошибка remove:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера",error });
  }
};

export default { getAll, getOne, create, update, remove };
