import { Request, Response } from "express";
import { db } from "../utils/db";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// fetch the authenticated user's profile
export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await (await db).get("SELECT id, username FROM users WHERE id = ?", [req.user?.id]);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// update user's profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(400).json({ error: "Username is required" });
            return;
        }
        await (await db).run("UPDATE users SET username = ? WHERE id = ?", [username, req.user?.id]);
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// delete user's profile
export const deleteProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        await (await db).run("DELETE FROM users WHERE id = ?", [req.user?.id]);
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};