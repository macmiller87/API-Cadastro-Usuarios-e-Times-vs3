import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';
import { Users } from '@modules/CreateUsers/entities/CreateUsers';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';

@Injectable()
export class ListUsersAndTeams {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string): Promise<Users> {
    const user = await this.usersRepository.listUsersAndTeams(user_id);

    if (!user) {
      throw new AppError('User Not Found!', 404);
    }

    return user;
  }
}
