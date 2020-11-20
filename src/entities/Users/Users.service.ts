import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import usersRepository from './Users.repository';
import User from './Users.model';
import uploadConfig from '../../config/upload';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface UpdateAvatar {
  user_id: string;
  avatarFilename: string;
}

class UsersService {
  private usersRepository: usersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(usersRepository);
  }

  public async createUser({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email Address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async updateAvatar({
    user_id,
    avatarFilename,
  }: UpdateAvatar): Promise<User> {
    const user = await this.usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UsersService;
