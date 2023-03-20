import { Injectable } from '@nestjs/common';
import { AppError } from 'src/utils/errors/AppError';
import { ITeamsRepository } from '../../repositories/implementation-ITeamsRepository/ITeamsRepository';

@Injectable()
export class DeleteTeam {
  constructor(private teamRepository: ITeamsRepository) {}

  async execute(team_id: string): Promise<void> {
    const team = await this.teamRepository.findTeamById(team_id);

    if (!team) {
      throw new AppError('Team Not Found !', 404);
    }

    await this.teamRepository.deleteTeam(team_id);
  }
}
