"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAll = async (_req, res) => {
    try {
        const cats = await prisma_1.default.cats.findMany({});
        res.status(200).json({ success: true, cats });
    }
    catch (error) {
        console.error("Ошибка getAll:", error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
};
const getOne = async (req, res) => {
    try {
        const catId = req.params.id;
        if (!catId) {
            return res
                .status(400)
                .json({ success: false, message: "ID кота обязателен" });
        }
        const cat = await prisma_1.default.cats.findUnique({
            where: { id: catId },
        });
        if (!cat) {
            return res.status(404).json({ success: false, message: "Кот не найден" });
        }
        res.status(200).json({ success: true, cat });
    }
    catch (error) {
        console.error("Ошибка getOne:", error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
};
const create = async (req, res) => {
    try {
        const { name, color, age, paws, price, image } = req.body;
        if (!name || !color || !age || !paws || !price) {
            return res.status(400).json({
                success: false,
                message: "Все обязательные поля должны быть заполнены",
            });
        }
        const newCat = await prisma_1.default.cats.create({
            data: { name, color, age, paws, price, image },
        });
        res.status(201).json({ success: true, cat: newCat });
    }
    catch (error) {
        console.error("Ошибка create:", error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
};
const update = async (req, res) => {
    try {
        const catId = req.params.id;
        if (!catId) {
            return res
                .status(400)
                .json({ success: false, message: "ID кота обязателен" });
        }
        const { name, color, age, paws, price, sale, image } = req.body;
        const cat = await prisma_1.default.cats.findUnique({ where: { id: catId } });
        if (!cat)
            return res.status(404).json({ success: false, message: "Кот не найден" });
        const updatedCat = await prisma_1.default.cats.update({
            where: { id: catId },
            data: { name, color, age, paws, price, sale, image },
        });
        res.status(200).json({ success: true, cat: updatedCat });
    }
    catch (error) {
        console.error("Ошибка update:", error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
};
const remove = async (req, res) => {
    try {
        const catId = req.params.id;
        if (!catId) {
            return res
                .status(400)
                .json({ success: false, message: "ID кота обязателен" });
        }
        const cat = await prisma_1.default.cats.findUnique({ where: { id: catId } });
        if (!cat)
            return res.status(404).json({ success: false, message: "Кот не найден" });
        await prisma_1.default.cats.delete({ where: { id: catId } });
        res.status(200).json({ success: true, message: "Кот удалён" });
    }
    catch (error) {
        console.error("Ошибка remove:", error);
        res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
};
exports.default = { getAll, getOne, create, update, remove };
//# sourceMappingURL=cats.controllers.js.map