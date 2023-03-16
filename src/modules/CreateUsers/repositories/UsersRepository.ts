import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUsersDTO, Users } from '../entities/CreateUsers';
import { IUsersRepository } from './Implementation-IUserRepository/IUsersRepository';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private prismaService: PrismaService) {}

  // eslint-disable-next-line prettier/prettier
   async create({ user_id, userName, userAvatar, email, password }: CreateUsersDTO): Promise<Users> {
    const user = await this.prismaService.users.create({
      data: {
        user_id: user_id,
        userName: userName,
        userAvatar: userAvatar,
        email: email,
        password: password,
      },
      include: {
        teams: true,
      },
    });

    return user;
  }

  async findByUsername(userName: string): Promise<Users> {
    const userByUsername = await this.prismaService.users.findFirst({
      where: {
        userName: userName,
      },
    });

    return userByUsername;
  }

  async findByUserId(user_id: string): Promise<Users> {
    const user = await this.prismaService.users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    return user;
  }

  async listSpecificUserById(user_id: string): Promise<Users> {
    const userById = await this.prismaService.users.findUnique({
      where: {
        user_id: user_id,
      },
    });

    return userById;
  }

  async listUsersAndTeams(user_id: string): Promise<Users> {
    const user = await this.prismaService.users.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        teams: true,
      },
    });

    return user;
  }
}
