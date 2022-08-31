import { Equal, Like, Raw } from "typeorm";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules_users_properties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors.errors";
import { IScheduleRequest } from "../../interfaces/schedules";

export const createScheduleService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const porpertiesRepository = AppDataSource.getRepository(Properties);
  const userRepository = AppDataSource.getRepository(User);

  const property = await porpertiesRepository.findOne({
    where: { id: propertyId },
  });

  if (!property) {
    throw new AppError("Property not found.", 404);
  }

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const schedule = scheduleRepository.create({
    date,
    hour,
    property,
    user,
  });

  const comercialHour = parseInt(hour.split(":")[0]);
  const comparedDate = new Date(date);

  if (comercialHour < 8 || comercialHour >= 18) {
    throw new AppError("Appointments only during business hours", 400);
  }

  if (comparedDate.getDay() < 1 || comparedDate.getDay() > 5) {
    throw new AppError("Appointments only during business hours", 400);
  }

  const alreadyScheduledExists = await scheduleRepository.findOne({ where: { property: { id: propertyId } } })
 
  if(alreadyScheduledExists){
    throw new AppError('Data or time not avaible.', 400);
  }

  await scheduleRepository.save(schedule);

  return schedule;
}; 