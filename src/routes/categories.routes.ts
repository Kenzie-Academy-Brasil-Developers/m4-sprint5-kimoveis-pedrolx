import { Router } from "express";
import { createCategoryController } from "../controller/categories/createCategory.controller";
import { listCategoriesController } from "../controller/categories/listCategories.controller";
import { listPropertiesInCategoryController } from "../controller/categories/listPropertiesInCategory.controller";
import { ensureUserIsAdm } from "../middlewares/ensureUserIsAdm.middleware";
import { tokenAuthMIddleware } from "../middlewares/tokenAuth.middlewares";

export const categoriesRoutes = Router();

categoriesRoutes.post('', tokenAuthMIddleware, ensureUserIsAdm, createCategoryController);
categoriesRoutes.get('', listCategoriesController);
categoriesRoutes.get('/:id/properties', listPropertiesInCategoryController);