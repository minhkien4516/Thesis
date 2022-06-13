import { IsNotEmpty, IsString } from 'class-validator';

export class AddCorporationEmployeeDto {
  @IsNotEmpty()
  @IsString()
  employeeId!: string;

  @IsNotEmpty()
  @IsString()
  corporationId!: string;
}
