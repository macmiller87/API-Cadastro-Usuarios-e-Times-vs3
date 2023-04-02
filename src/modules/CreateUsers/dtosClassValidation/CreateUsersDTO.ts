import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUsersDTO {
  @ApiProperty({ example: 'Chavez' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'Chavinho' })
  @IsNotEmpty()
  userAvatar: string;

  @ApiProperty({ example: 'chavez@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha secreta' })
  @IsNotEmpty()
  password: string;
}
