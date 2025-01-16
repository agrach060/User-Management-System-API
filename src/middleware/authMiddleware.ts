import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const error = new Error("Authorization header missing or malformed");
            (error as any).status = 401;
            throw error;
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        req.user = decoded;
        next();
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ error: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            res.status(401).json({ error: "Token expired" });
        } else {
            res.status(error.status || 500).json({ error: error.message || "Internal server error" });
        }
    }
};