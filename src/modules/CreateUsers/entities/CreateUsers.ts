export interface CreateUsersDTO {
  user_id?: string;
  userName: string;
  userAvatar: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class Users {
  private userProps?: CreateUsersDTO;

  constructor(userId?: string, createdat?: Date) {
    this.userProps.createdAt = createdat ?? new Date();
  }

  public set userName(userName: string) {
    this.userName = userName;
  }

  public get userName(): string {
    return this.userName;
  }

  public set userAvatar(userAvatar: string) {
    this.userAvatar = userAvatar;
  }

  public get userAvatar(): string {
    return this.userAvatar;
  }

  public set email(email: string) {
    this.email = email;
  }

  public get email(): string {
    return this.email;
  }

  public set password(password: string) {
    this.password = password;
  }

  public get password(): string {
    return this.password;
  }

  public get createdAt(): Date {
    return this.userProps.createdAt;
  }
}
