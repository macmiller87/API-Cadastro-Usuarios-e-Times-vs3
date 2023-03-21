// eslint-disable-next-line prettier/prettier
import { CreateUsersDTO, Users } from '@modules/CreateUsers/entities/CreateUsers';
import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';
import { hash } from 'bcryptjs';

@Injectable()
export class CreateUsers {
  constructor(private userRepository: IUsersRepository) {}

  // eslint-disable-next-line prettier/prettier
  async execute({ userName, userAvatar, email, password }: CreateUsersDTO): Promise<Users> {

    // eslint-disable-next-line prettier/prettier
    const userAlreadyExists = await this.userRepository.findByUsername(userName);

    if (userAlreadyExists) {
      throw new AppError('User Already Exists!', 404);
    }

    const passwordHash = await hash(password, 8);

    const user = this.userRepository.create({
      user_id: randomUUID(),
      userName,
      userAvatar,
      email,
      password: passwordHash,
    });

    return user;
  }
}
