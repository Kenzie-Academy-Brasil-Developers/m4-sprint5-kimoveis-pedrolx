import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/category.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appErrors.errors";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";

export const createPropertyService = async ({ value, size, categoryId }: IPropertyRequest, { district, zipCode, number, city, state }: IAddressRequest):Promise<Properties> => {

    const propertyRepository = AppDataSource.getRepository(Properties);
    const addressRepository = AppDataSource.getRepository(Addresses);
    const categoriesRepository = AppDataSource.getRepository(Categories);

    const category = await categoriesRepository.findOne({ where: {
        id: categoryId
    } });

    if(!category){
        throw new AppError('Category not found', 404);
    }

    if(zipCode.length > 8) {
        throw new AppError('ZipCode number must have eigth digits or less.', 400)
    }

    if(state.length > 2) {
        throw new AppError('State abbreviation must have two letters.', 400)
    }

    const address = addressRepository.create({
        district,
        zipCode,
        number,
        city,
        state
    })

    const addressAlreadyExists = await addressRepository.findOne({ where: { district: district } });

    if(addressAlreadyExists) {
        throw new AppError('This property is already registered.', 400)
    }

    await addressRepository.save(address);

    const property = propertyRepository.create({
        value,
        size,
        address,
        category
    });

    await propertyRepository.save(property);

    return property;

}