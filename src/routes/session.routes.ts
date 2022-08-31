import { Router } from "express";
import { createSessionController } from "../controller/sessions/createSession.controller";

export const sessionRoute = Router()

sessionRoute.post('', createSessionController);