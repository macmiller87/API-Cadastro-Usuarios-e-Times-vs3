import { Users } from '@modules/CreateUsers/entities/CreateUsers';

export interface ICreateUserTokenDTO {
  token: string;
  user: Pick<Users, 'user_id' | 'userName' | 'email'>;
}

export interface IcreateUserToken {
  user_id: string;
}
