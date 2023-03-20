import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateTeamsDTO, Teams } from '../entities/CreateTeams';
import { ITeamsRepository } from './implementation-ITeamsRepository/ITeamsRepository';

@Injectable()
export class TeamsRepository implements ITeamsRepository {
  constructor(private prismaService: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
  async create({ teamName, city, country, user_id }: CreateTeamsDTO): Promise<Teams> {
    const team = await this.prismaService.teams.create({
      data: {
        TeamName: teamName,
        city: city,
        country: country,
        user_id: user_id,
      },
    });
    return team;
  }

  async findByTeamName(teamName: string): Promise<Teams> {
    const team = await this.prismaService.teams.findFirst({
      where: {
        TeamName: teamName,
      },
    });

    return team;
  }

  async listSpecificTeam(team_id: string): Promise<Teams> {
    const team = await this.prismaService.teams.findUnique({
      where: {
        team_id: team_id,
      },
    });

    return team;
  }
}
