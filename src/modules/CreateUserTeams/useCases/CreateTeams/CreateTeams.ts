import { Injectable } from '@nestjs/common';
import { AppError } from 'src/utils/errors/AppError';
import { IUsersRepository } from 'src/modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';
import { CreateTeamsDTO, Teams } from '../../entities/CreateTeams';
import { ITeamsRepository } from '../../repositories/implementation-ITeamsRepository/ITeamsRepository';

@Injectable()
export class CreateTeams {
  constructor(
    private teamsRepository: ITeamsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  // eslint-disable-next-line prettier/prettier
  async execute({ teamName, city, country, user_id }: CreateTeamsDTO ): Promise<Teams> {
    const user = await this.usersRepository.findByUserId(user_id);

    const teamAlreadyExists = await this.teamsRepository.findByTeamName(
      teamName,
    );

    if (teamAlreadyExists) {
      throw new AppError('Team Already Exists!', 404);
    }

    const team = await this.teamsRepository.create({
      teamName: teamName,
      city: city,
      country: country,
      user_id: user.user_id,
    });

    return team;
  }
}
