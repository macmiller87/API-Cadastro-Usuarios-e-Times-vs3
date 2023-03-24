/* eslint-disable prettier/prettier */
import { Users } from '../../entities/CreateUsers';
import { IUsersRepository } from '../Implementation-IUserRepository/IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  public users: Users[] = [];

  async create(data: Users) {
    this.users.push(data);
  }

  async findByUsername(userName: string): Promise<Users> {
    const userByUserName = this.users.find((item) => item.userName === userName);
    return userByUserName;
  }

  async findByEmail(email: string): Promise<Users> {
    const userByEmail = this.users.find((item) => item.email === email);
    return userByEmail;
  }

  async findByUserId(user_id: string): Promise<Users> {
    const userById = this.users.find((item) => item.user_id === user_id);
    return userById;
  }

  async listSpecificUserById(user_id: string): Promise<Users> {
    const userById = this.users.find((item) => item.user_id === user_id);
    return userById;
  }

  async listUsersAndTeams(user_id: string): Promise<Users> {
    const userById = this.users.find((item) => item.user_id === user_id);
    return userById;
  }

  async deleteUser(user_id: string): Promise<void> {
    this.users.filter((item) => item.user_id === user_id);
  }
}
