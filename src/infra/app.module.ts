// eslint-disable-next-line prettier/prettier
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from '@controller/User.controller';
import { TeamController } from '@controller/Team.controller';
import { UserDatabaseModule } from '@database/user_database.module';
import { CreateUsers } from '@modules/CreateUsers/useCases/CreateUsers/CreateUsers';
import { ListSpecifcUser } from '@modules/CreateUsers/useCases/ListUser/ListSpecifcUser';
import { ListUsersAndTeams } from '@modules/CreateUsers/useCases/ListUsersAndTeams/ListUsersAndTeams';
import { CreateTeams } from '@modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { TeamDatabaseModule } from '@database/team-database.module';
import { DeleteUsers } from '@modules/CreateUsers/useCases/DeleteUsers/DeleteUsers';
import { AuthenticateUsersToken } from '@modules/CreateUsers/useCases/CreateUsersToken/CreateUsersToken';
import { UserTokenDatabaseModule } from '@database/userToken-database.module';
import { EnsureUserAuthenticate } from '@utils/auth/EnsureUserAuthenticate';
import { ListSpecificTeam } from '@modules/CreateUserTeams/useCases/ListTeam/ListSpecificTeam';
import { DeleteTeam } from '@modules/CreateUserTeams/useCases/DeleteTeams/DeleteTeam';

@Module({
  imports: [UserDatabaseModule, TeamDatabaseModule, UserTokenDatabaseModule],
  controllers: [UserController, TeamController],
  providers: [
    CreateUsers,
    ListSpecifcUser,
    ListUsersAndTeams,
    DeleteUsers,
    AuthenticateUsersToken,

    CreateTeams,
    ListSpecificTeam,
    DeleteTeam,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureUserAuthenticate)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/userToken', method: RequestMethod.POST },
      )
      .forRoutes(UserController, TeamController);
  }
}
