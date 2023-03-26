import { ICreateUserToken } from '@modules/CreateUsers/dtoUserToken/ICreateUserToken';
import { IUsersTokenRepository } from '@modules/CreateUsers/repositories/Implementation-IUserRepository/IUsersTokenRepository';

export class InMemoryUsersTokenRepository implements IUsersTokenRepository {
  public userToken: ICreateUserToken[] = [];

  async create(user_id: ICreateUserToken) {
    this.userToken.push(user_id);
  }

  async deleteUserId(user_id: string): Promise<void> {
    const user = this.userToken.findIndex((item) => item.user_id === user_id);
    this.userToken.splice(user, 1);
  }
}
