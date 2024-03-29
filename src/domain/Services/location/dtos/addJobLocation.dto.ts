import { IsNotEmpty, IsString } from 'class-validator';

export class AddJobLocationDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  locationId!: string;
}
