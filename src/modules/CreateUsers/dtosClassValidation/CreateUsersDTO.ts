import { IsNotEmpty } from 'class-validator';

export class CreateUsersDTO {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  userAvatar: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
