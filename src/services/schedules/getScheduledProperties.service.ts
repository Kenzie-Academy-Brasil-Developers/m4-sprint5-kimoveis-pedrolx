import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../errors/appErrors.errors";

export const getScheduledPropertiesService = async ({ id }: any):Promise<any> => {

    const propertiesRepository = AppDataSource.getRepository(Properties);

    const property = await propertiesRepository.findOne({ where: { 
        id: id
     },
    relations: {
        schedules: true
    } });

    if(!property){
        throw new AppError('Schedules not found for this property.', 404);
    }

    return property;

}