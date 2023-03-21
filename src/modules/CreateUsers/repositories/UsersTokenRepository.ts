import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { IcreateUserToken } from '@modules/CreateUsers/dtoUserToken/ICreateUserToken';
import { UserToken } from '@modules/CreateUsers/entities/CreateUsersToken';
import { IUsersTokenRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersTokenRepository';

@Injectable()
export class UsersTokenRepository implements IUsersTokenRepository {
  constructor(private prismaService: PrismaService) {}

  async create({ user_id }: IcreateUserToken): Promise<UserToken> {
    const userToken = await this.prismaService.userToken.create({
      data: {
        user_id: user_id,
      },
      include: {
        user: true,
      },
    });

    return userToken;
  }
}
