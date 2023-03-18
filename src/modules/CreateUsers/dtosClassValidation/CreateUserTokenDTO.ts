import { IsNotEmpty } from 'class-validator';

export class CreateUserTokenDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
