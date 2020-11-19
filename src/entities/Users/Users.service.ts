import { getCustomRepository } from 'typeorm';
import usersRepository from './Users.repository';
import User from './Users.model';

interface Request {
  name: string;
  email: string;
  password: string;
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
      throw new Error('Email Address already used.');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default UsersService;