import { Teams } from '@modules/CreateUserTeams/entities/CreateTeams';

export class TeamResponseMapper {
  static TeamMapper(team: Teams) {
    return {
      team_id: team.team_id,
      TeamName: team.TeamName,
      city: team.city,
      country: team.country,
      createdAt: team.createdAt,
      user_id: team.user_id,
    };
  }
}
