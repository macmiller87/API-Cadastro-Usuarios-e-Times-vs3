import { Injectable } from '@nestjs/common';
import { AppError } from 'src/utils/errors/AppError';
import { Teams } from '../../entities/CreateTeams';
import { ITeamsRepository } from '../../repositories/implementation-ITeamsRepository/ITeamsRepository';

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
