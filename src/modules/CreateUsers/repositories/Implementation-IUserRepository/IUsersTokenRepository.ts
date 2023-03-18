import { IcreateUserToken } from '../../dtoUserToken/ICreateUserToken';
import { UserToken } from '../../entities/CreateUsersToken';

export abstract class IUsersTokenRepository {
  abstract create({ user_id }: IcreateUserToken): Promise<UserToken>;
}
