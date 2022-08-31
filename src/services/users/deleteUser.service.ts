import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors.errors";

export const deleteUserService = async ({ id }: any): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const userActive = await userRepository.findOne({ where: { id: id } });

  if(!userActive){
    throw new AppError("User not found", 404);
  }

  if(!userActive?.isActive) {
    throw new AppError('User already disabled.')
  }

  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ isActive: false })
    .where("id = :id", { id: id })
    .execute();

  return "User disabled";
};
