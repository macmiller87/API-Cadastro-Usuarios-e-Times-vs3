import { Module } from '@nestjs/common';
import { UsersRepository } from '@modules/CreateUsers/repositories/UsersRepository';
import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepository],
})
export class UserDatabaseModule {}
