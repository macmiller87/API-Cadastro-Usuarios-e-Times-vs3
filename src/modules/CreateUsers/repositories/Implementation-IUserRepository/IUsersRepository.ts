import { Users } from '@modules/CreateUsers/entities/CreateUsers';

export abstract class IUsersRepository {
  abstract create(data: Users): Promise<void>;
  abstract findByUsername(userName: string): Promise<Users>;
  abstract findByEmail(email: string): Promise<Users>;
  abstract findByUserId(user_id: string): Promise<Users>;
  abstract listSpecificUserById(user_id: string): Promise<Users>;
  abstract listUsersAndTeams(user_id: string): Promise<Users>;
  abstract deleteUser(user_id: string): Promise<void>;
}
