import { ITeamsRepository } from '@modules/CreateUserTeams/repositories/implementation-ITeamsRepository/ITeamsRepository';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';
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
