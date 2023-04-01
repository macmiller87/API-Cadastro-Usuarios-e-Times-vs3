// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { CreateTeams } from '@modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { DeleteTeam } from '@modules/CreateUserTeams/useCases/DeleteTeams/DeleteTeam';
import { ListSpecificTeam } from '@modules/CreateUserTeams/useCases/ListTeam/ListSpecificTeam';
import { CreateTeamsDTO } from '@modules/CreateUserTeams/dtosClassValidation/CreateTeamsDTO';

@Controller('teams')
export class TeamController {
  constructor(
    private createTeam: CreateTeams,
    private listSpecificTeam: ListSpecificTeam,
    private deleteTeam: DeleteTeam,
  ) {}

  @Post()
  async create(@Body() body: CreateTeamsDTO, @Request() request) {
    const { user_id } = request.user;
    const { teamName, city, country } = body;

    const { team } = await this.createTeam.execute({
      teamName,
      city,
      country,
      user_id,
    });

    return team;
  }

  @Get('listSpecificTeam')
  async listTeam(@Query('team_id') team_id: string) {
    const team = await this.listSpecificTeam.execute(team_id);

    return team;
  }

  @Delete('deleteTeam/:team_id')
  async DeleteTeam(@Param('team_id') team_id: string) {
    await this.deleteTeam.execute(team_id);
  }
}
