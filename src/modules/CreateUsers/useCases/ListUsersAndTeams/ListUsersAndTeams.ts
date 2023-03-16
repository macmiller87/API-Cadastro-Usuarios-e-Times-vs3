import { Injectable } from '@nestjs/common';
import { AppError } from 'src/errors/AppError';
import { Users } from '../../entities/CreateUsers';
import { IUsersRepository } from '../../repositories/Implementation-IUserRepository/IUsersRepository';

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
