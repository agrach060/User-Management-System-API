import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../utils/db";

// user registration
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await (await db).run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// user login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await (await db).get("SELECT * FROM users WHERE username = ?", [username]);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
