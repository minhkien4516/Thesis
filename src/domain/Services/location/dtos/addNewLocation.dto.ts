import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddNewLocationDto {
  @IsString()
  @IsNotEmpty()
  country?: string | null;

  @IsString()
  @IsNotEmpty()
  city?: string | null;

  @IsString()
  @IsNotEmpty()
  district?: string | null;

  @IsString()
  @IsNotEmpty()
  ward?: string | null;

  @IsString()
  @IsNotEmpty()
  street?: string | null;

  @IsString()
  @IsNotEmpty()
  details?: string | null;

  @IsString()
  @IsOptional()
  slug?: string | null;
}
