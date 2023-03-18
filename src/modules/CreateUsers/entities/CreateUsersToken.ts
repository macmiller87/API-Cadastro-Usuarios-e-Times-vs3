export interface CreateUsersTokenDTO {
  id?: string;
  user_id: string;
  createdAt: Date;
}

export class UserToken {
  private userTokenProps?: CreateUsersTokenDTO;

  constructor(createdAt?: Date) {
    this.userTokenProps.createdAt = createdAt ?? new Date();
  }

  public set id(id: string) {
    this.userTokenProps.id = id;
  }

  public get id(): string {
    return this.userTokenProps.id;
  }

  public set user_id(id: string) {
    this.userTokenProps.user_id = id;
  }

  public get user_id(): string {
    return this.userTokenProps.user_id;
  }

  public get createdAt(): Date {
    return this.userTokenProps.createdAt;
  }
}
