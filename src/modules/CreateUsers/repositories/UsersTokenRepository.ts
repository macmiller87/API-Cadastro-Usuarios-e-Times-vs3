import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { ICreateUserToken } from '@modules/CreateUsers/dtoUserToken/ICreateUserToken';
import { IUsersTokenRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersTokenRepository';

@Injectable()
export class UsersTokenRepository implements IUsersTokenRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user_id: ICreateUserToken): Promise<void> {
    await this.prismaService.userToken.create({
      data: user_id,
      include: {
        user: true,
      },
    });
  }
}
