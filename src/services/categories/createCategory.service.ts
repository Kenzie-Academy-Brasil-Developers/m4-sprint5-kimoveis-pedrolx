import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/appErrors.errors";
import { ICategoryRequest } from "../../interfaces/categories";

export const createCategoryService = async ({ name }: ICategoryRequest) => {
    const categoryRepository = AppDataSource.getRepository(Categories);

    const categoryAlreadyExists = await categoryRepository.findOne({ where: { name: name } });

    if(categoryAlreadyExists){
        throw new AppError('This category already exists.', 400);
    }

    const category = categoryRepository.create({ name: name })

    await categoryRepository.save(category);

    return category;
}