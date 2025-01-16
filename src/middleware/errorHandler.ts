import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    status?: number;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(err.stack);

    const status = err.status || 500;
    const message = err.message || "Internal server error";

    res.status(status).json({
        error: message,
    });
};