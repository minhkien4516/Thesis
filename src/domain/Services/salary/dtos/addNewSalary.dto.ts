import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddNewSalaryDto {
  @IsNumber()
  @IsNotEmpty()
  gt?: number | null;

  @IsNumber()
  @IsNotEmpty()
  lt?: number | null;

  @IsString()
  @IsNotEmpty()
  unit?: string | null;
}
