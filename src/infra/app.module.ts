import { Module } from '@nestjs/common';
import { UserController } from '../controller/User.controller';
import { TeamController } from '../controller/Team.controller';
import { UserDatabaseModule } from 'src/database/user_database.module';
import { CreateUsers } from 'src/modules/CreateUsers/useCases/CreateUsers.ts/CreateUsers';
import { ListSpecifcUser } from 'src/modules/CreateUsers/useCases/ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from 'src/modules/CreateUsers/useCases/ListUsersAndTeams/ListUsersAndTeams';
import { CreateTeams } from 'src/modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { TeamDatabaseModule } from 'src/database/team-database.module';

@Module({
  imports: [UserDatabaseModule, TeamDatabaseModule],
  controllers: [UserController, TeamController],
  // eslint-disable-next-line prettier/prettier
  providers: [
    CreateUsers, 
    ListSpecifcUser, 
    ListUsersAndTeams,

    CreateTeams
  ],
})
export class AppModule {}
