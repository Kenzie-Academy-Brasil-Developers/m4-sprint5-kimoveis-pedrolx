import { Router } from "express";
import { createPropertyController } from "../controller/properties/createProperty.controller";
import { getPropertiesController } from "../controller/properties/getProperties.controller";
import { ensureUserIsAdm } from "../middlewares/ensureUserIsAdm.middleware";
import { tokenAuthMIddleware } from "../middlewares/tokenAuth.middlewares";

export const propertiesRoutes = Router();

propertiesRoutes.post('', tokenAuthMIddleware, ensureUserIsAdm, createPropertyController);
propertiesRoutes.get('', getPropertiesController);

