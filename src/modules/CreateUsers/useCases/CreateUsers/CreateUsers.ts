import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { AppError } from 'src/utils/errors/AppError';
import { CreateUsersDTO, Users } from '../../entities/CreateUsers';
import { IUsersRepository } from '../../repositories/Implementation-IUserRepository/IUsersRepository';
import { hash } from 'bcryptjs';

@Injectable()
export class CreateUsers {
  constructor(private userRepositoy: IUsersRepository) {}

  // eslint-disable-next-line prettier/prettier
  async execute({ userName, userAvatar, email, password }: CreateUsersDTO): Promise<Users> {

    const userAlreadyExists = await this.userRepositoy.findByUsername(userName);

    if (userAlreadyExists) {
      throw new AppError('User Already Exists!', 404);
    }

    const passwordHash = await hash(password, 8);

    const user = this.userRepositoy.create({
      user_id: randomUUID(),
      userName,
      userAvatar,
      email,
      password: passwordHash,
    });

    return user;
  }
}
