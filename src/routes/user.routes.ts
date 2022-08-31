import { Router } from "express";
import { createUserController } from "../controller/user/createUser.controller";
import { deleteUserController } from "../controller/user/deleteUser.controller";
import { listUserController } from "../controller/user/listUsers.controller";
import { ensureUserIsAdm } from "../middlewares/ensureUserIsAdm.middleware";
import { tokenAuthMIddleware } from "../middlewares/tokenAuth.middlewares";

export const userRoutes = Router()

userRoutes.post('', createUserController);
userRoutes.get('', tokenAuthMIddleware, ensureUserIsAdm, listUserController);
userRoutes.delete('/:id', tokenAuthMIddleware, ensureUserIsAdm, deleteUserController);

