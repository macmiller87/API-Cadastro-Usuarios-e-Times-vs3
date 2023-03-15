import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { CreateUsersDTO, Users } from '../../entities/CreateUsers';
import { IUsersRepository } from '../../repositories/Implementation-IUserRepository/IUsersRepository';

@Injectable()
export class CreateUsers {
  constructor(private userRepositoy: IUsersRepository) {}

  // eslint-disable-next-line prettier/prettier
  async execute({ userName, userAvatar, email, password }: CreateUsersDTO): Promise<Users> {

    const userAlreadyExists = await this.userRepositoy.findByUsername(userName);

    if (userAlreadyExists) {
      throw new AppError('User Already Exists!', 404);
    }

    const user = this.userRepositoy.create({
      userName,
      userAvatar,
      email,
      password,
    });

    return user;
  }
}
