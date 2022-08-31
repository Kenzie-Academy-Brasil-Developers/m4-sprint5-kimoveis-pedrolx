import AppDataSource from '../../data-source'
import { User } from '../../entities/user.entity'
import { AppError } from '../../errors/appErrors.errors';
import { IUser, IUserLogin, IUserRequest } from '../../interfaces/users'
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createSessionService = async ({ email, password }: IUserLogin): Promise<string> => {

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email: email } });

    if (!user) {
        throw new AppError('Invalid e-mail or password.', 403);
    }

    if(!user.isActive) {
        throw new AppError('Invalid user', 403);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
        throw new AppError('Invalid email or password', 403)
    }

    const token = jwt.sign({ isAdm: user.isAdm }, process.env.SECRET_KEY as string, { subject: user.id, expiresIn: '2h' })

    return token;
}