import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AddNewCorporationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(7)
  @IsNotEmpty()
  hotline: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  presenterId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  overtimeRequire: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  special: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  startWorkTime: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  endWorkTime: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  numberEmployees: string;
}
