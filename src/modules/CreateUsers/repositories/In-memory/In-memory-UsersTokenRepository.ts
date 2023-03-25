import { ICreateUserToken } from '@modules/CreateUsers/dtoUserToken/ICreateUserToken';
import { IUsersTokenRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersTokenRepository';

export class InMemoryUsersTokenRepository implements IUsersTokenRepository {
  public userToken: ICreateUserToken[] = [];

  async create(user_id: ICreateUserToken) {
    this.userToken.push(user_id);
  }
}
