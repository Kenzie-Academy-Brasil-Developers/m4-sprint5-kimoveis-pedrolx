import { Request, Response, NextFunction } from "express";

export const ensureUserIsAdm = async (req: Request, res: Response, next: NextFunction) => {
    const isAdm = req.user?.isAdm;

    if(!isAdm) {
        return res.status(403).json({ message: "Missing Admin permissions" })
    }

    next();
}