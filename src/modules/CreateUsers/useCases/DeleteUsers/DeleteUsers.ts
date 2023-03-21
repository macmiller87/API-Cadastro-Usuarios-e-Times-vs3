import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';

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
