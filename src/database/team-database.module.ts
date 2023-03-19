import { Module } from '@nestjs/common';
import { ITeamsRepository } from 'src/modules/CreateUserTeams/repositories/implementation-ITeamsRepository/ITeamsRepository';
import { TeamsRepository } from 'src/modules/CreateUserTeams/repositories/TeamsRepository';
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
