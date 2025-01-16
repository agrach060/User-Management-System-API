import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../utils/db";

// user registration
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            const error = new Error("Username and password are required");
            (error as any).status = 400;
            throw error;
        }

        const existingUser = await (await db).get("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser) {
            const error = new Error("Username already exists");
            (error as any).status = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await (await db).run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
};

// user login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            const error = new Error("Username and password are required");
            (error as any).status = 400;
            throw error;
        }

        const user = await (await db).get("SELECT * FROM users WHERE username = ?", [username]);
        if (!user) {
            const error = new Error("Invalid credentials");
            (error as any).status = 400;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid credentials");
            (error as any).status = 400;
            throw error;
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};