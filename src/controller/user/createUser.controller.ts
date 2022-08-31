import { Request, response, Response } from "express";
import { createUserService } from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

export const createUserController = async (req: Request, res: Response) => {
    const { name, email, password, isAdm } = req.body;

    const user = await createUserService({ name, email, password, isAdm });

    return res.status(201).json(instanceToPlain(user));
}