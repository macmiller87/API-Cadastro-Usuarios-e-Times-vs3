import { ICreateUserToken } from '@modules/CreateUsers/dtoUserToken/ICreateUserToken';

export abstract class IUsersTokenRepository {
  abstract create(user_id: ICreateUserToken): Promise<void>;
  abstract deleteUserId(user_id: string): Promise<void>;
}
