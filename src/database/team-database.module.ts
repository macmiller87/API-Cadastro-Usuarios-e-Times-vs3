import { Module } from '@nestjs/common';
import { ITeamsRepository } from '@modules/CreateUserTeams/repositories/implementation-ITeamsRepository/ITeamsRepository';
import { TeamsRepository } from '@modules/CreateUserTeams/repositories/TeamsRepository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: ITeamsRepository,
      useClass: TeamsRepository,
    },
  ],
  exports: [ITeamsRepository],
})
export class TeamDatabaseModule {}
