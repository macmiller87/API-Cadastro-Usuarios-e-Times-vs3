// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUsersDTO } from '@modules/CreateUsers/dtosClassValidation/CreateUsersDTO';
import { CreateUserTokenDTO } from '@modules/CreateUsers/dtosClassValidation/CreateUserTokenDTO';
import { AuthenticateUsersToken } from '@modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { DeleteUsers } from '@modules/CreateUsers/useCases/DeleteUsers/DeleteUsers';
import { ListSpecifcUser } from '@modules/CreateUsers/useCases/ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from '@modules/CreateUsers/useCases/ListUsersAndTeams/ListUsersAndTeams';

@Controller('users')
export class UserController {
  constructor(
    private createUsers: CreateUsers,
    private listSpecifcUser: ListSpecifcUser,
    private listUserAndTeams: ListUsersAndTeams,
    private deleteUser: DeleteUsers,
    private createUserToken: AuthenticateUsersToken,
  ) {}

  @Post()
  async create(@Body() body: CreateUsersDTO) {
    const { userName, userAvatar, email, password } = body;

    const { user } = await this.createUsers.execute({
      userName,
      userAvatar,
      email,
      password,
    });

    return user;
  }

  @Post('userToken')
  async createToken(@Body() body: CreateUserTokenDTO) {
    const { email, password } = body;

    const { user, token } = await this.createUserToken.execute({
      email,
      password,
    });

    return {
      user,
      token,
    };
  }

  @Get('listSpecificUser')
  async listUser(@Query('user_id') user_id: string) {
    const userById = await this.listSpecifcUser.execute(user_id);

    return userById;
  }

  @Get('listUserAndTeams')
  async listUserAndTeam(@Query('user_id') user_id: string) {
    const user = await this.listUserAndTeams.execute(user_id);

    return user;
  }

  @Delete('deleteUser')
  async DeleteUsers(@Query('user_id') user_id: string) {
    await this.deleteUser.execute(user_id);
  }
}
