import { IsNotEmpty, IsString } from 'class-validator';

export class AddNewLocationDto {
  @IsString()
  @IsNotEmpty()
  country?: string;

  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsString()
  @IsNotEmpty()
  district?: string;

  @IsString()
  @IsNotEmpty()
  ward?: string;

  @IsString()
  @IsNotEmpty()
  street?: string;

  @IsString()
  @IsNotEmpty()
  details?: string;
}
