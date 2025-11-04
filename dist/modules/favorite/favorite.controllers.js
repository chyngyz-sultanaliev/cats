"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAll = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const favorites = await prisma_1.default.favorite.findMany({
            where: { userId },
            include: { cat: true },
        });
        res.status(200).json(favorites);
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при получении избранного" });
    }
};
const addFavorite = async (req, res) => {
    const { catId } = req.body;
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    try {
        const newFavorite = await prisma_1.default.favorite.create({
            data: { userId, catId },
        });
        res.status(201).json(newFavorite);
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при добавлении в избранное" });
    }
};
const removeFavorite = async (req, res) => {
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
        await prisma_1.default.favorite.delete({
            where: { id: favoriteId, userId },
        });
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        res.status(404).json({ error: "Избранное не найдено" });
    }
};
exports.default = { getAll, addFavorite, removeFavorite };
//# sourceMappingURL=favorite.controllers.js.map