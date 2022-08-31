import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appErrors.errors";

export const listPropertiesInCategoryService = async ({
  id,
}: any): Promise<any> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const categories = await categoriesRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (!categories) {
    throw new AppError("Category not found.", 404);
  }

  return categories;
};
