import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddNewSalaryDto {
  @IsNumber()
  @IsNotEmpty()
  gt?: number;

  @IsNumber()
  @IsNotEmpty()
  lt?: number;

  @IsString()
  @IsNotEmpty()
  unit?: string;
}
