import { IsNotEmpty } from 'class-validator';

export class CreateTeamsDTO {
  @IsNotEmpty()
  teamName: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;
}
