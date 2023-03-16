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

  constructor(createdat?: Date) {
    this.userProps.createdAt = createdat ?? new Date();
  }

  public set user_id(user_id: string) {
    this.userProps.user_id = user_id;
  }

  public get user_id(): string {
    return this.userProps.user_id;
  }

  public set userName(userName: string) {
    this.userProps.userName = userName;
  }

  public get userName(): string {
    return this.userProps.userName;
  }

  public set userAvatar(userAvatar: string) {
    this.userProps.userAvatar = userAvatar;
  }

  public get userAvatar(): string {
    return this.userProps.userAvatar;
  }

  public set email(email: string) {
    this.userProps.email = email;
  }

  public get email(): string {
    return this.userProps.email;
  }

  public set password(password: string) {
    this.userProps.password = password;
  }

  public get password(): string {
    return this.userProps.password;
  }

  public get createdAt(): Date {
    return this.userProps.createdAt;
  }
}
