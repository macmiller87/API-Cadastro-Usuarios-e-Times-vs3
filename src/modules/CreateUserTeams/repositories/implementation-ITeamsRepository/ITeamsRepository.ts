import { Teams } from '@modules/CreateUserTeams/entities/CreateTeams';

export abstract class ITeamsRepository {
  abstract create(data: Teams): Promise<void>;
  abstract findByTeamName(teamName: string): Promise<Teams>;
  abstract findTeamById(team_id: string): Promise<Teams>;
  abstract listSpecificTeam(team_id: string): Promise<Teams>;
  abstract deleteTeam(team_id: string): Promise<void>;
}
