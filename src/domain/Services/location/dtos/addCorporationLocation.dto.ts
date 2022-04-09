import { IsNotEmpty, IsString } from 'class-validator';

export class AddCorporationLocationDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  locationId!: string;
}
