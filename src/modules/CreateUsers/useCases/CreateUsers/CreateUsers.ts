import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';
import { Users } from '@modules/CreateUsers/entities/CreateUsers';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';
import { hash } from 'bcryptjs';

interface userCreateRequest {
  userName: string;
  userAvatar: string;
  email: string;
  password: string;
}

interface userCreateResponse {
  user: Users;
}
@Injectable()
export class CreateUsers {
  constructor(private userRepository: IUsersRepository) {}

  async execute(request: userCreateRequest): Promise<userCreateResponse> {
    const { userName, userAvatar, email, password } = request;

    // eslint-disable-next-line prettier/prettier
    const userAlreadyExists = await this.userRepository.findByUsername(userName);

    if (userAlreadyExists) {
      throw new AppError('User Already Exists!', 404);
    }

    const passwordHash = await hash(password, 8);

    const user = new Users({
      userName,
      userAvatar,
      email,
      password: passwordHash,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
