import { Replace } from '@utils/helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface CreateTeamsDTO {
  team_id?: string;
  teamName: string;
  city: string;
  country: string;
  createdAt?: Date;
  user_id?: string;
}

export class Teams {
  private teamsProps?: CreateTeamsDTO;
  private _team_id?: string;

  constructor(
    props: Replace<CreateTeamsDTO, { createdAt?: Date }>,
    id?: string,
  ) {
    this._team_id = id ?? randomUUID();
    this.teamsProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set team_id(id: string) {
    this._team_id = id;
  }

  public get team_id(): string {
    return this._team_id;
  }

  public set TeamName(teamName: string) {
    this.teamsProps.teamName = teamName;
  }

  public get TeamName(): string {
    return this.teamsProps.teamName;
  }

  public set city(city: string) {
    this.teamsProps.city = city;
  }

  public get city(): string {
    return this.teamsProps.city;
  }

  public set country(country: string) {
    this.teamsProps.country = country;
  }

  public get country(): string {
    return this.teamsProps.country;
  }

  public get createdAt(): Date {
    return this.teamsProps.createdAt;
  }

  public set user_id(user_id: string) {
    this.teamsProps.user_id = user_id;
  }

  public get user_id(): string {
    return this.teamsProps.user_id;
  }
}
