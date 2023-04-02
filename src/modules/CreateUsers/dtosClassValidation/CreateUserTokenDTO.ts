import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserTokenDTO {
  @ApiProperty({ example: 'chavez@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha secreta' })
  @IsNotEmpty()
  password: string;
}
