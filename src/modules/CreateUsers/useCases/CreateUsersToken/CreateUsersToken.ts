import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AuthConfig from 'src/utils/config/AuthConfig';
import { AppError } from 'src/utils/errors/AppError';
import { ICreateUserTokenDTO } from '../../dtoUserToken/ICreateUserToken';
import { IUsersRepository } from '../../repositories/Implementation-IUserRepository/IUsersRepository';
import { IUsersTokenRepository } from '../../repositories/Implementation-IUserRepository/IUsersTokenRepository';

export interface IRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateUsersToken {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokenRepository: IUsersTokenRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<ICreateUserTokenDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User Email Not Found or Incorrect !', 404);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password Incorrect !', 404);
    }

    const { secret_token, expiresIn } = AuthConfig.jwt;

    const token = sign({ user }, secret_token, {
      subject: user.user_id,
      expiresIn,
    });

    await this.usersTokenRepository.create({
      user_id: user.user_id,
    });

    return {
      user: {
        user_id: user.user_id,
        userName: user.userName,
        email: user.email,
      },
      token,
    };
  }
}
