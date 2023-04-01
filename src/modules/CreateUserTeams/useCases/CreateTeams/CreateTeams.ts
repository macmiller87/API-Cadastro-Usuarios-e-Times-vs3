/* eslint-disable prettier/prettier */
import { Teams } from '@modules/CreateUserTeams/entities/CreateTeams';
import { ITeamsRepository } from '@modules/CreateUserTeams/repositories/implementation-ITeamsRepository/ITeamsRepository';
import { Injectable } from '@nestjs/common';
import { AppError } from '@utils/errors/AppError';
import { IUsersRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersRepository';

export interface teamsCreateRequest {
  teamName: string;
  city: string;
  country: string;
  user_id: string;
}

export interface teamsCreateResponse {
  team: Teams;
}

@Injectable()
export class CreateTeams {
  constructor(
    private teamsRepository: ITeamsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(request: teamsCreateRequest): Promise<teamsCreateResponse> {
    const { teamName, city, country, user_id } = request;
    
    const user = await this.usersRepository.findByUserId(user_id);

    const teamAlreadyExists = await this.teamsRepository.findByTeamName(
      teamName,
    );

    if (teamAlreadyExists) {
      throw new AppError('Team Already Exists!', 404);
    }

    const team = new Teams({
      teamName,
      city,
      country,
      user_id: user.user_id,
    });

    await this.teamsRepository.create(team);

    return {
      team
    };
  }
}
