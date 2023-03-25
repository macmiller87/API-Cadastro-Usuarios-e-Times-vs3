import { Replace } from '@utils/helpers/Replace';
export interface CreateUsersTokenDTO {
  id?: string;
  user_id?: string;
  createdAt: Date;
}

export class UserToken {
  private userTokenProps?: CreateUsersTokenDTO;

  constructor(props?: Replace<CreateUsersTokenDTO, { createdAt?: Date }>) {
    this.userTokenProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set id(id: string) {
    this.userTokenProps.id = id;
  }

  public get id(): string {
    return this.userTokenProps.id;
  }

  public set user_id(id: string) {
    this.user_id = id;
  }

  public get user_id(): string {
    return this.user_id;
  }

  public get createdAt(): Date {
    return this.userTokenProps.createdAt;
  }
}
