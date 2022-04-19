import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AddNewCorporationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string | null;

  @IsString()
  @IsOptional()
  @MinLength(7)
  @IsNotEmpty()
  hotline: string | null;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  presenterId: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  overtimeRequire: string | null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  special: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  startWorkTime: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  endWorkTime: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  origin: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  numberEmployees: string | null;
}
