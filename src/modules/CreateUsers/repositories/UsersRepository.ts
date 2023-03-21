// eslint-disable-next-line prettier/prettier
import { CreateUsersDTO, Users } from '@modules/CreateUsers/entities/CreateUsers';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';

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

  async findByEmail(email: string): Promise<Users> {
    const userByEmail = await this.prismaService.users.findFirst({
      where: {
        email: email,
      },
    });

    return userByEmail;
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

  async deleteUser(user_id: string): Promise<void> {
    await this.prismaService.users.delete({
      where: {
        user_id: user_id,
      },
    });
  }
}
