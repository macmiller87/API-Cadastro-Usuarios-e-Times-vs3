/* eslint-disable prettier/prettier */
import { Teams } from '@modules/CreateUserTeams/entities/CreateTeams';
import { ITeamsRepository } from '../implementation-ITeamsRepository/ITeamsRepository';

export class InmemoryTeamsRepository implements ITeamsRepository {
    public teams: Teams[] = [];
    
    async create(data: Teams): Promise<void> {
        this.teams.push(data);
    }

    async findByTeamName(teamName: string): Promise<Teams> {
        const team = this.teams.find((item) => item.TeamName === teamName);
        return team;
    }

    async findTeamById(team_id: string): Promise<Teams> {
        const team = this.teams.find((item) => item.team_id === team_id);
        return team;
    }

    async listSpecificTeam(team_id: string): Promise<Teams> {
        const team = this.teams.find((item) => item.team_id === team_id);
        return team;
    }

    async deleteTeam(team_id: string): Promise<void> {
        const team = this.teams.findIndex((item) => item.team_id === team_id);
        this.teams.splice(team, 1);
    }
}
