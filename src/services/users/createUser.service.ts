import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appErrors.errors";

export const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.findOne({
    where: { email: email },
  });

  if (userAlreadyExists) {
    throw new AppError("This e-mail is already being used.");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
    isActive: true,
  });

  await userRepository.save(user);
  

  return user;
};
