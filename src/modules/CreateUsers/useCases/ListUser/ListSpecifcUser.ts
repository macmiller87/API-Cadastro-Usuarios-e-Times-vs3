import { Injectable } from '@nestjs/common';
import { AppError } from 'src/utils/errors/AppError';
import { Users } from '../../entities/CreateUsers';
import { IUsersRepository } from '../../repositories/Implementation-IUserRepository/IUsersRepository';

@Injectable()
export class ListSpecifcUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string): Promise<Users> {
    const userById = await this.usersRepository.listSpecificUserById(user_id);

    if (!userById) {
      throw new AppError('User Not Found !', 404);
    }

    return userById;
  }
}
