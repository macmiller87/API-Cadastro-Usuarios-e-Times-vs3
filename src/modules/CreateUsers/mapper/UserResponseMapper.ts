import { Users } from '@modules/CreateUsers/entities/CreateUsers';

export class UserResponseMapper {
  static UserRespMapper(user: Users) {
    return {
      user_id: user.user_id,
      userName: user.userName,
      userAvatar: user.userAvatar,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    };
  }
}
