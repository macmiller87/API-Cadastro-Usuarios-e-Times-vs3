import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CreateTeams } from 'src/modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { ListSpecificTeam } from 'src/modules/CreateUserTeams/useCases/ListTeam/ListSpecificTeam';
import { CreateTeamsDTO } from '../modules/CreateUserTeams/dtosClassValidation/CreateTeamsDTO';

@Controller('teams')
export class TeamController {
  constructor(
    private createTeam: CreateTeams,
    private listSpecificTeam: ListSpecificTeam,
  ) {}

  @Post()
  // eslint-disable-next-line prettier/prettier
  async create(@Body() body: CreateTeamsDTO, @Request() request) {
    const { user_id } = request.user;
    const { teamName, city, country } = body;

    const team = await this.createTeam.execute({
      teamName,
      city,
      country,
      user_id,
    });

    return team;
  }

  @Get('listSpecificTeam/:team_id')
  async listTeam(@Param('team_id') team_id: string) {
    const team = await this.listSpecificTeam.execute(team_id);

    return team;
  }
}
