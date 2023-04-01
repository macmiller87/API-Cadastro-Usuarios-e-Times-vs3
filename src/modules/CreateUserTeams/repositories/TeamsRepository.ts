import { Teams } from '@modules/CreateUserTeams/entities/CreateTeams';
import { ITeamsRepository } from '@modules/CreateUserTeams/repositories/implementation-ITeamsRepository/ITeamsRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { TeamResponseMapper } from '../mapper/TeamResponseMapper';
@Injectable()
export class TeamsRepository implements ITeamsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Teams): Promise<void> {
    const teamDatas = TeamResponseMapper.TeamMapper(data);

    await this.prismaService.teams.create({
      data: teamDatas,
      include: {
        user: true,
      },
    });
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
