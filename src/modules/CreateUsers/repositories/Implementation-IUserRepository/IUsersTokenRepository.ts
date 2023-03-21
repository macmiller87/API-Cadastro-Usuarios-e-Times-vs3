import { IcreateUserToken } from '@modules/CreateUsers/dtoUserToken/ICreateUserToken';
import { UserToken } from '@modules/CreateUsers/entities/CreateUsersToken';

export abstract class IUsersTokenRepository {
  abstract create({ user_id }: IcreateUserToken): Promise<UserToken>;
}
