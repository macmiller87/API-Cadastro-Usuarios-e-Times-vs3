import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateTeams } from 'src/modules/CreateUserTeams/useCases/CreateTeams/CreateTeams';
import { CreateTeamsDTO } from '../modules/CreateUserTeams/dtosClassValidation/CreateTeamsDTO';

@Controller('teams')
export class TeamController {
  constructor(private createTeam: CreateTeams) {}

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
}
