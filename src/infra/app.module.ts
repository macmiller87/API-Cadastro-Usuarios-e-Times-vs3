// eslint-disable-next-line prettier/prettier
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from '../controller/User.controller';
import { TeamController } from '../controller/Team.controller';
import { UserDatabaseModule } from 'src/database/user_database.module';
import { CreateUsers } from 'src/modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { ListSpecifcUser } from 'src/modules/CreateUsers/useCases/ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from 'src/modules/CreateUsers/useCases/ListUsersAndTeams/ListUsersAndTeams';
import { CreateTeams } from 'src/modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { TeamDatabaseModule } from 'src/database/team-database.module';
import { DeleteUsers } from 'src/modules/CreateUsers/useCases/DeleteUsers/DeleteUsers';
import { AuthenticateUsersToken } from 'src/modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { UserTokenDatabaseModule } from 'src/database/userToken-database.module';
import { ensureUserAuthenticate } from 'src/utils/auth/EnsureUserAuthenticate';
import { ListSpecificTeam } from 'src/modules/CreateUserTeams/useCases/ListTeam/ListSpecificTeam';

@Module({
  imports: [UserDatabaseModule, TeamDatabaseModule, UserTokenDatabaseModule],
  controllers: [UserController, TeamController],
  // eslint-disable-next-line prettier/prettier
  providers: [
    CreateUsers,
    ListSpecifcUser,
    ListUsersAndTeams,
    DeleteUsers,
    AuthenticateUsersToken,

    CreateTeams,
    ListSpecificTeam,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // eslint-disable-next-line prettier/prettier
    consumer
      .apply(ensureUserAuthenticate)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/userToken', method: RequestMethod.POST },
      )
      .forRoutes(UserController, TeamController);
  }
}
