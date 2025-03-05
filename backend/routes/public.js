import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// Rota de cadastro
router.post("/cadastro", async (req, res) => {
    try {
        const user = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.senha, salt);

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                nome: user.nome,
                senha: hashPassword,
            },
        });

        res.status(201).json(userDB);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor..." });
    }
});

// Rota de Login
router.post("/login", async (req, res) => {
    try {
        const userInfo = req.body;

        const userDB = await prisma.user.findUnique({
            where: {
                email: userInfo.email,
            },
        });

        if (!userDB) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        const isMatch = await bcrypt.compare(userInfo.senha, userDB.senha);

        if (!isMatch) {
            return res.status(400).json({ message: "Senha incorreta" });
        }

        const token = jwt.sign({ id: userDB.Id }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            user: userDB,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor..." });
    }
});

export default router;
