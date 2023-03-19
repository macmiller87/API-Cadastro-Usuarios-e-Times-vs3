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

  constructor(createdAt?: Date) {
    this.teamsProps.createdAt = createdAt ?? new Date();
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
