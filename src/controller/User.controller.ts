// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUsersDTO } from 'src/modules/CreateUsers/dtosClassValidation/CreateUsersDTO';
import { CreateUserTokenDTO } from 'src/modules/CreateUsers/dtosClassValidation/CreateUserTokenDTO';
import { AuthenticateUsersToken } from 'src/modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { CreateUsers } from 'src/modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { DeleteUsers } from 'src/modules/CreateUsers/useCases/DeleteUsers/DeleteUsers';
import { ListSpecifcUser } from 'src/modules/CreateUsers/useCases/ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from 'src/modules/CreateUsers/useCases/ListUsersAndTeams/ListUsersAndTeams';

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

    const user = await this.createUsers.execute({
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

  @Get('listSpecificUser/:user_id')
  async listUser(@Param('user_id') user_id: string) {
    const userById = await this.listSpecifcUser.execute(user_id);

    return userById;
  }

  @Get('listUserAndTeams/:user_id')
  async listUserAndTeam(@Param('user_id') user_id: string) {
    const user = await this.listUserAndTeams.execute(user_id);

    return user;
  }

  @Delete('deleteUser/:user_id')
  async DeleteUsers(@Param('user_id') user_id: string) {
    await this.deleteUser.execute(user_id);
  }
}
