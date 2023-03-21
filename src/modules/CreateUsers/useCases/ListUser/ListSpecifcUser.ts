import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';
import { Users } from '@modules/CreateUsers/entities/CreateUsers';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';

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
