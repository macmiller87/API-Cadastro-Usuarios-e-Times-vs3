import { Injectable } from '@nestjs/common';
import { AppError } from 'src/utils/errors/AppError';
import { IUsersRepository } from '../../repositories/Implementation-IUserRepository/IUsersRepository';

@Injectable()
export class DeleteUsers {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError('User Not Found !', 404);
    }

    await this.usersRepository.deleteUser(user_id);
  }
}
