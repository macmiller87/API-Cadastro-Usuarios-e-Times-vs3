import { CreateTeamsDTO, Teams } from '../../entities/CreateTeams';

export abstract class ITeamsRepository {
  // eslint-disable-next-line prettier/prettier
  abstract create({ teamName, city, country, user_id }: CreateTeamsDTO): Promise<Teams>;
  abstract findByTeamName(teamName: string): Promise<Teams>;
}
