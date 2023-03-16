import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsersDTO } from 'src/modules/CreateUsers/dtosClassValidation/CreateUsersDTO';
import { CreateUsers } from 'src/modules/CreateUsers/useCases/CreateUsers.ts/CreateUsers';
import { ListSpecifcUser } from 'src/modules/CreateUsers/useCases/ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from 'src/modules/CreateUsers/useCases/ListUsersAndTeams/ListUsersAndTeams';

@Controller('users')
export class UserController {
  constructor(
    private createUsers: CreateUsers,
    private listSpecifcUser: ListSpecifcUser,
    private listUserAndTeams: ListUsersAndTeams,
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
}
