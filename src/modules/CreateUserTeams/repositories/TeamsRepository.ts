// eslint-disable-next-line prettier/prettier
import { CreateTeamsDTO, Teams } from '@modules/CreateUserTeams/entities/CreateTeams'
import { ITeamsRepository } from '@modules/CreateUserTeams/repositories/implementation-ITeamsRepository/ITeamsRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
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

  async findTeamById(team_id: string): Promise<Teams> {
    const team = await this.prismaService.teams.findUnique({
      where: {
        team_id: team_id,
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

  async deleteTeam(team_id: string): Promise<void> {
    await this.prismaService.teams.delete({
      where: {
        team_id: team_id,
      },
    });
  }
}
