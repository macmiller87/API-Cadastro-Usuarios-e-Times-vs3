import { Module } from '@nestjs/common';
import { IUsersTokenRepository } from 'src/modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersTokenRepository';
import { UsersTokenRepository } from 'src/modules/CreateUsers/repositories/UsersTokenRepository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUsersTokenRepository,
      useClass: UsersTokenRepository,
    },
  ],
  exports: [IUsersTokenRepository],
})
export class UserTokenDatabaseModule {}
