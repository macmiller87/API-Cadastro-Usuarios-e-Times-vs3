import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsersDTO } from 'src/modules/CreateUsers/dtosClassValidation/CreateUsersDTO';
import { CreateUsers } from 'src/modules/CreateUsers/useCases/CreateUsers.ts/CreateUsers';
import { ListSpecifcUser } from 'src/modules/CreateUsers/useCases/ListUser/ListSpecifcUser';

@Controller('users')
export class AppController {
  constructor(
    private createUsers: CreateUsers,
    private listSpecifcUser: ListSpecifcUser,
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
}
