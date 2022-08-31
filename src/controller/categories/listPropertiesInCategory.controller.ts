import { Request, Response } from "express";
import { listPropertiesInCategoryService } from "../../services/categories/listPropertiesInCategory.service";

export const listPropertiesInCategoryController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const categories = await listPropertiesInCategoryService({ id });

    return res.status(200).json(categories);
}