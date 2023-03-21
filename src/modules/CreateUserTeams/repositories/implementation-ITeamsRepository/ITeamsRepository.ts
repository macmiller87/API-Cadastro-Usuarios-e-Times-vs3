// eslint-disable-next-line prettier/prettier
import { CreateTeamsDTO, Teams } from '@modules/CreateUserTeams/entities/CreateTeams';

export abstract class ITeamsRepository {
  // eslint-disable-next-line prettier/prettier
  abstract create({ teamName, city, country, user_id }: CreateTeamsDTO): Promise<Teams>;
  abstract findByTeamName(teamName: string): Promise<Teams>;
  abstract findTeamById(team_id: string): Promise<Teams>;
  abstract listSpecificTeam(team_id: string): Promise<Teams>;
  abstract deleteTeam(team_id: string): Promise<void>;
}
