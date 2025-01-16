import { Request, Response, NextFunction } from "express";
import { db } from "../utils/db";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// fetch the authenticated user's profile
export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await (await db).get("SELECT id, username FROM users WHERE id = ?", [req.user?.id]);
        if (!user) {
            const error = new Error("User not found");
            (error as any).status = 404;
            throw error;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// update user's profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username } = req.body;

        if (!username) {
            const error = new Error("Username is required");
            (error as any).status = 400;
            throw error;
        }

        await (await db).run("UPDATE users SET username = ? WHERE id = ?", [username, req.user?.id]);
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        next(error);
    }
};

// delete user's profile
export const deleteProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await (await db).run("DELETE FROM users WHERE id = ?", [req.user?.id]);
        if (result.changes === 0) {
            const error = new Error("User not found");
            (error as any).status = 404;
            throw error;
        }
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        next(error);
    }
};