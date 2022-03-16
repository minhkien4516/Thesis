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

  @IsNumber()
  @IsOptional()
  @MinLength(7)
  @IsNotEmpty()
  hotline: number;

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
  @IsNumber()
  @IsNotEmpty()
  numberEmployees: number;
}
