import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class AddNewCorporationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @MinLength(7)
  @IsNotEmpty()
  hotline!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  presenterId?: string;

  @IsString()
  overtimeRequire!: string;

  @IsString()
  special!: string;

  @IsString()
  @IsNotEmpty()
  startWorkTime!: string;

  @IsString()
  @IsNotEmpty()
  endWorkTime!: string;

  @IsString()
  @IsNotEmpty()
  origin!: string;

  @IsNumber()
  @IsNotEmpty()
  numberEmployees!: number;
}
