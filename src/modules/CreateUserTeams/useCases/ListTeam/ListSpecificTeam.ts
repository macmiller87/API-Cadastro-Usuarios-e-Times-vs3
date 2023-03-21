import { ITeamsRepository } from '@modules/CreateUserTeams/repositories/implementation-ITeamsRepository/ITeamsRepository';
import { Teams } from '@modules/CreateUserTeams/entities/CreateTeams';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';
@Injectable()
export class ListSpecificTeam {
  constructor(private teamRepository: ITeamsRepository) {}

  async execute(team_id: string): Promise<Teams> {
    const team = await this.teamRepository.listSpecificTeam(team_id);

    if (!team) {
      throw new AppError('Team Not Found !', 404);
    }

    return team;
  }
}
