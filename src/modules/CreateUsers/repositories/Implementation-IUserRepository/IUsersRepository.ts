import { CreateUsersDTO, Users } from '../../entities/CreateUsers';

export abstract class IUsersRepository {
  // eslint-disable-next-line prettier/prettier
  abstract create({ user_id, userName, userAvatar, email, password }: CreateUsersDTO): Promise<Users>;
  abstract findByUsername(userName: string): Promise<Users>;
  abstract findByUserId(user_id: string): Promise<Users>;
  abstract listSpecificUserById(user_id: string): Promise<Users>;
  abstract listUsersAndTeams(user_id: string): Promise<Users>;
}