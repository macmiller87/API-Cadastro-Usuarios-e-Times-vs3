import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTeamsDTO {
  @ApiProperty({ example: 'F.C Ibis' })
  @IsNotEmpty()
  teamName: string;

  @ApiProperty({ example: 'Paulista' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Brasil' })
  @IsNotEmpty()
  country: string;
}
