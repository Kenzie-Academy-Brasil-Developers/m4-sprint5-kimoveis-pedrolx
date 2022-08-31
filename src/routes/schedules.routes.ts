import { Router } from "express";
import { createScheduleController } from "../controller/schedules/createSchedule.controller";
import { getScheduledPropertiesController } from "../controller/schedules/getScheduledProperties.controller";
import { ensureUserIsAdm } from "../middlewares/ensureUserIsAdm.middleware";
import { tokenAuthMIddleware } from "../middlewares/tokenAuth.middlewares";

export const schedulesRoutes = Router();

schedulesRoutes.post('', tokenAuthMIddleware, createScheduleController);
schedulesRoutes.get('/properties/:id', tokenAuthMIddleware, ensureUserIsAdm, getScheduledPropertiesController);